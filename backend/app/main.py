from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import match, reports, auth

app = FastAPI(
    title="Welfare Scheme Matcher API",
    description="Welfare-scheme eligibility matching with explainable ML predictions.",
    version="0.1.0",
)

# Allow the Next.js frontend (any origin during hackathon dev — tighten
# this to your actual deployed frontend URL before final judging/demo).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Importing app.models.predict triggers loading of the trained model,
    # encoder, and SHAP explainers at process start — not on first request.
    from app.models import predict  # noqa: F401
    print("ML artifacts loaded. Ready to serve /match requests.")


@app.get("/")
def root():
    return {"status": "ok", "service": "welfare-scheme-matcher-api"}


app.include_router(match.router)
app.include_router(reports.router)
app.include_router(auth.router)
