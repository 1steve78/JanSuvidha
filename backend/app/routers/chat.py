"""
POST /chat — Multilingual Gemini-powered chatbot for welfare scheme guidance.
Supports English, Hindi, and Bengali. Uses the google.generativeai SDK.
"""
import os
import json
import warnings
from typing import List, Optional

# Suppress the deprecation warning — the old SDK still works fine
warnings.filterwarnings("ignore", category=FutureWarning, module="google")

from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai

from app.db.scheme_data import SCHEMES

router = APIRouter(tags=["chat"])

# Lazy model — configured on first request after env vars are loaded
_model = None

def get_model():
    global _model
    if _model is None:
        api_key = os.getenv("GEMINI_API_KEY", "")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY environment variable is not set")
        genai.configure(api_key=api_key)
        _model = genai.GenerativeModel("models/gemini-2.5-flash")
    return _model


# Build a compact scheme catalogue string once (injected into every system prompt)
SCHEME_CATALOGUE = "\n".join(
    f"- {s['name']}: {s['short_description']}"
    for s in SCHEMES
)

LANGUAGE_INSTRUCTIONS = {
    "en": "Respond in English.",
    "hi": "हिंदी में जवाब दें। (Respond only in Hindi)",
    "bn": "বাংলায় উত্তর দিন। (Respond only in Bengali)",
}

SYSTEM_PROMPT_TEMPLATE = """You are JanSuvidha Saathi — a friendly, empathetic welfare guide for Indian citizens.
You help users discover government welfare schemes, file civic grievances, and track complaints.

KNOWN SCHEMES:
{catalogue}

RULES — READ CAREFULLY:
1. {lang_instruction}
2. Write in simple, conversational language. No jargon. No bullet-heavy lists.
3. The "reply" field must be a PLAIN TEXT string — natural sentences only, no nested objects, no arrays.
   When listing schemes, write them inline like: "You may be eligible for PM-KISAN, Ayushman Bharat, and PM Fasal Bima Yojana."
4. Keep replies under 4 sentences.
5. End with ONE short follow-up question or a call to action.
6. Detect intent and set "action":
   - "match"  → user wants to check scheme eligibility
   - "report" → user wants to file a complaint
   - "track"  → user wants to track a complaint
   - null     → general question

OUTPUT FORMAT — STRICTLY FOLLOW THIS. Return ONLY this JSON object, nothing else:
{{"reply": "<plain text response>", "action": null, "action_hint": null}}

DO NOT: wrap in markdown, use nested JSON, include arrays in reply, add extra keys.
"""


class ChatMessage(BaseModel):
    role: str  # "user" | "model"
    text: str


class ChatRequest(BaseModel):
    message: str
    language: str = "en"  # "en" | "hi" | "bn"
    history: Optional[List[ChatMessage]] = []


class ChatResponse(BaseModel):
    reply: str
    action: Optional[str] = None
    action_hint: Optional[str] = None


def flatten_to_prose(obj: dict, lang: str) -> str:
    """
    Fallback: if Gemini returns a complex JSON instead of {reply, action, action_hint},
    convert the data into a readable paragraph so users never see raw JSON.
    """
    lines = []

    # Try to pull any 'message' or 'reply' key first
    if "reply" in obj:
        return obj["reply"]
    if "message" in obj:
        lines.append(obj["message"])

    # Flatten any list values (like schemes_for_students)
    for key, val in obj.items():
        if key == "message":
            continue
        if isinstance(val, list):
            for item in val:
                if isinstance(item, dict):
                    name = item.get("name", "")
                    desc = item.get("description", item.get("short_description", ""))
                    if name:
                        lines.append(f"• {name}: {desc}" if desc else f"• {name}")
                elif isinstance(item, str):
                    lines.append(f"• {item}")
        elif isinstance(val, str) and val:
            lines.append(val)

    result = "\n".join(lines).strip()
    if not result:
        return "I found some information, but couldn't format it properly. Please try rephrasing your question."
    return result


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    lang = req.language if req.language in LANGUAGE_INSTRUCTIONS else "en"
    lang_instruction = LANGUAGE_INSTRUCTIONS[lang]

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
        catalogue=SCHEME_CATALOGUE,
        lang_instruction=lang_instruction,
    )

    # Build Gemini multi-turn history
    history_for_gemini = []
    for msg in (req.history or [])[-6:]:
        history_for_gemini.append({
            "role": msg.role,
            "parts": [msg.text],
        })

    model = get_model()
    chat_session = model.start_chat(history=history_for_gemini)

    # First message gets the full system prompt prepended; subsequent turns get a brief reminder
    if not req.history:
        user_content = f"{system_prompt}\n\nUser: {req.message}"
    else:
        user_content = f"[{lang_instruction} Return JSON only]\n{req.message}"

    try:
        response = chat_session.send_message(user_content)
        raw_text = response.text.strip()

        # Strip accidental markdown fences
        if raw_text.startswith("```"):
            parts = raw_text.split("```")
            raw_text = parts[1] if len(parts) > 1 else raw_text
            if raw_text.startswith("json"):
                raw_text = raw_text[4:]
            raw_text = raw_text.strip()

        parsed = json.loads(raw_text)

        # Check if model returned the correct flat structure
        if "reply" in parsed and isinstance(parsed["reply"], str):
            return ChatResponse(
                reply=parsed["reply"],
                action=parsed.get("action"),
                action_hint=parsed.get("action_hint"),
            )
        else:
            # Model returned a custom JSON structure — flatten it to prose
            prose = flatten_to_prose(parsed, lang)
            # Try to infer action from keys
            action = None
            if any(k in parsed for k in ["schemes", "schemes_for_students", "eligible_schemes"]):
                action = "match"
            return ChatResponse(reply=prose, action=action, action_hint=None)

    except json.JSONDecodeError:
        # Gemini returned plain prose (not JSON) — use it directly, it's fine
        return ChatResponse(reply=response.text.strip(), action=None, action_hint=None)
    except Exception as e:
        print(f"[Chat error] {e}")
        return ChatResponse(
            reply="Sorry, I'm having trouble connecting right now. Please try again.",
            action=None,
            action_hint=None,
        )
