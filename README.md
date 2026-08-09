# 🇮🇳 JanSuvidha — AI-Powered Welfare & Civic Platform

**Live Demo:** [https://jansuvidha.yasinstudios.in/](https://jansuvidha.yasinstudios.in/)

> **IEMHACKS 4.0 · Social Issues Track**
> Bridging the gap between Indian citizens and the welfare schemes they deserve.

JanSuvidha ("Jan" = People, "Suvidha" = Facility/Convenience) is a full-stack civic-tech platform that helps Indian citizens:

1. **Discover welfare schemes** they're eligible for via an XGBoost ML model with SHAP-powered plain-language explanations.
2. **File anonymous civic grievances** (corruption, harassment, civic issues, safety) with geolocation tagging.
3. **Track their complaints** in real time using a UUID-based anonymous system.
4. **Chat with an AI guide** (JanSuvidha Saathi) in English, Hindi, or Bengali, powered by Gemini 2.5 Flash.
5. **Visualise civic data** on a public dashboard with charts and interactive maps.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Machine Learning Pipeline](#-machine-learning-pipeline)
- [Database Schema](#-database-schema)
- [Pages & Features](#-pages--features)
- [Admin Panel](#-admin-panel)
- [Privacy & Ethics](#-privacy--ethics)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Scheme Matching** | Multi-label XGBoost model predicts eligibility across 15+ central/state welfare schemes |
| 💡 **SHAP Explanations** | Every match comes with plain-English reasons ("You qualify because your income is below ₹1.2L and you own farmland") |
| 📋 **Document Checklist** | Tells users exactly which documents to carry before applying |
| 📢 **Anonymous Reporting** | Citizens file grievances without revealing identity; UUID used for tracking |
| 📍 **Geo-Tagging** | Reports can be pinned to a map location for spatial analysis |
| ⏫ **Auto-Escalation** | Reports unresolved after 72 hours are automatically flagged as escalated |
| 🤖 **AI Chatbot** | Multilingual Gemini 2.5 Flash chatbot guides users to the right feature |
| 📊 **Public Dashboard** | Privacy-preserving stats (counts < 5 suppressed, weekly grouping) with Recharts charts |
| 🗺️ **Interactive Map** | Mapbox-powered heatmap of civic complaints and scheme density per state |
| 🔐 **Admin Panel** | JWT-protected dashboard to review all reports and update statuses |

---

## 🛠 Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **Next.js 16** (App Router) | React framework with server components |
| **TypeScript** | Static typing across the entire frontend |
| **Tailwind CSS v3** | Utility-first styling |
| **Framer Motion** | Page transitions and micro-animations |
| **GSAP** | Advanced scroll and entrance animations |
| **Recharts** | Bar charts, pie charts on the dashboard |
| **Mapbox GL / react-map-gl** | Interactive civic complaint and scheme density maps |
| **Zustand** | Global client state management |
| **Lucide React** | Icon library |
| **canvas-confetti** | Celebration effect on successful report submission |

### Backend
| Technology | Role |
|---|---|
| **FastAPI** | High-performance Python REST API |
| **SQLAlchemy** | ORM for PostgreSQL |
| **PostgreSQL** | Primary relational database (hosted on Neon) |
| **XGBoost** | Multi-label welfare scheme eligibility classifier |
| **scikit-learn** | `MultiOutputClassifier` wrapper, preprocessing, evaluation |
| **SHAP** | TreeExplainer for human-readable feature attributions |
| **Google Gemini 2.5 Flash** | Multilingual AI chatbot backend |
| **python-jose + passlib** | JWT auth & bcrypt password hashing |
| **Uvicorn** | ASGI server |

---

## 🏗 Architecture

```
┌───────────────────────────────────────────────────────┐
│                     Browser (User)                    │
└──────────────────────────┬────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼────────────────────────────┐
│             Next.js Frontend (Port 3000)               │
│  Pages: Home · Match · Results · Report · Track        │
│          Dashboard · Admin · Chat                      │
└──────────────────────────┬────────────────────────────┘
                           │ fetch() API calls
┌──────────────────────────▼────────────────────────────┐
│              FastAPI Backend (Port 8000)               │
│                                                        │
│  /match ──► ML Predictor (XGBoost + SHAP)              │
│  /reports ─► PostgreSQL (SQLAlchemy ORM)               │
│  /chat ───► Gemini 2.5 Flash (Google AI SDK)           │
│  /admin ──► JWT-protected admin endpoints              │
└──────────┬────────────────────┬───────────────────────┘
           │                    │
    ┌──────▼──────┐     ┌───────▼──────┐
    │  PostgreSQL  │     │  ML Artifacts │
    │  (Neon DB)   │     │  (joblib .pkl)│
    └─────────────┘     └──────────────┘
```

---

## 📁 Project Structure

```
JanSuvidha/
├── frontend/                     # Next.js App
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── page.tsx          # Home / Landing page
│   │   │   ├── match/            # Scheme eligibility form
│   │   │   │   └── results/      # Matched schemes display
│   │   │   ├── report/           # Civic grievance submission
│   │   │   ├── track/            # Complaint tracking by UUID
│   │   │   ├── dashboard/        # Public stats & maps
│   │   │   └── admin/            # Protected admin panel
│   │   ├── components/           # UI components
│   │   │   ├── home/             # Landing page sections
│   │   │   ├── match/            # Multi-step eligibility form
│   │   │   ├── results/          # Scheme result cards
│   │   │   ├── report/           # Grievance form components
│   │   │   ├── track/            # Tracking timeline UI
│   │   │   ├── dashboard/        # Charts and map widgets
│   │   │   ├── admin/            # Admin table and controls
│   │   │   ├── chat/             # Chatbot widget
│   │   │   ├── layout/           # Header, Footer, Navbar
│   │   │   └── ui/               # Shared primitives (Button, Card, etc.)
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useFormStep.ts    # Multi-step form state
│   │   │   ├── useGeolocation.ts # Browser geolocation
│   │   │   └── useCountUp.ts     # Animated number counters
│   │   ├── lib/                  # Utilities
│   │   │   ├── api.ts            # Typed API helper functions
│   │   │   ├── validators.ts     # Zod/custom form validation
│   │   │   └── constants.ts      # Category colors, labels
│   │   ├── styles/               # Global CSS
│   │   └── types/                # Shared TypeScript types
│   │       ├── scheme.ts         # Scheme & MatchResult types
│   │       └── report.ts         # Report & ReportStatus types
│   ├── public/                   # Static assets
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                      # FastAPI Application
    ├── app/
    │   ├── main.py               # FastAPI app, CORS, router mounts
    │   ├── dependencies.py       # JWT auth dependency
    │   ├── routers/
    │   │   ├── match.py          # POST /match · GET /schemes
    │   │   ├── reports.py        # CRUD for civic reports
    │   │   ├── auth.py           # POST /admin/login (JWT)
    │   │   └── chat.py           # POST /chat (Gemini)
    │   ├── models/
    │   │   ├── schemas.py        # Pydantic citizen profile schema
    │   │   ├── match_schemas.py  # MatchResult, MatchResponse
    │   │   ├── report_schemas.py # ReportCreate, ReportResponse, etc.
    │   │   ├── auth_schemas.py   # Token schema
    │   │   ├── rules.py          # Deterministic eligibility rule engine
    │   │   ├── features.py       # Feature encoding (OrdinalEncoder)
    │   │   ├── predict.py        # Load artifacts + run prediction
    │   │   ├── train_model.py    # Train & save XGBoost model + SHAP
    │   │   └── generate_synthetic_data.py  # Synthetic profile generator
    │   ├── db/
    │   │   ├── database.py       # SQLAlchemy engine + session
    │   │   ├── models.py         # ORM: Scheme, Report, ReportStatusLog
    │   │   ├── scheme_data.py    # Static scheme catalogue (15+ schemes)
    │   │   └── seed.py           # DB seed script
    │   └── ml_artifacts/         # Saved model files (auto-generated)
    │       ├── model.pkl
    │       ├── encoder.pkl
    │       └── scheme_names.pkl
    ├── welfare_matcher_pipeline.py  # End-to-end ML walkthrough script
    ├── welfare_matcher_pipeline.ipynb  # Jupyter notebook version
    ├── requirements.txt
    ├── .env.example
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+ with `pip`
- **Node.js** 18+ with `npm`
- **PostgreSQL** database (local or [Neon](https://neon.tech) free tier)
- **Google AI API Key** — [Get it here](https://aistudio.google.com/app/apikey) (for the chatbot)
- **Mapbox Access Token** — [Get it here](https://account.mapbox.com) (for the maps)

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your real values (see Environment Variables section below)

# 5. Initialise the database (creates tables via SQLAlchemy)
python -m app.db.seed

# 6. Train the ML model (only needs to be done once, or when scheme data changes)
python -m app.models.train_model
# This generates ml_artifacts/model.pkl, encoder.pkl, scheme_names.pkl

# 7. Start the development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Interactive API docs (Swagger UI): `http://localhost:8000/docs`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.local file:
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here" >> .env.local

# 4. Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Backend — `backend/.env`

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | *(required)* |
| `ADMIN_USERNAME` | Admin panel username | `admin` |
| `ADMIN_PASSWORD` | Admin panel password | `changeme` |
| `JWT_SECRET_KEY` | Secret for signing JWTs | *(must change in prod)* |
| `ESCALATION_HOURS` | Hours before auto-escalation | `72` |
| `GEMINI_API_KEY` | Google AI Studio API key | *(required for chat)* |

```env
# backend/.env (example)
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
JWT_SECRET_KEY=supersecretkey_change_me_in_prod
ESCALATION_HOURS=72
GEMINI_API_KEY=AIzaSy...
```

> ⚠️ **Never commit `.env` to version control.** The `.env.example` file is safe to commit.

### Frontend — `frontend/.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | FastAPI backend base URL |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL access token |

---

## 📡 API Reference

Base URL: `http://localhost:8000`

### Match Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/match` | ❌ | Submit citizen profile, receive ranked scheme matches with SHAP explanations |
| `GET` | `/schemes` | ❌ | List all schemes in the system (name, short description, apply URL) |

**`POST /match` — Request Body:**
```json
{
  "income": 140000,
  "age": 28,
  "occupation": "farmer",
  "gender": "female",
  "category": "ST",
  "state": "Odisha",
  "land_ownership": true,
  "student_status": false,
  "family_size": 5
}
```

**`POST /match` — Response:**
```json
{
  "count": 3,
  "matches": [
    {
      "name": "PM-KISAN",
      "short_description": "Income support of ₹6,000/year for farmer families.",
      "confidence": 0.94,
      "reasons": ["You are a farmer", "Your income is below the threshold", "You own agricultural land"],
      "document_checklist": ["Aadhaar Card", "Land Records", "Bank Account"],
      "apply_url": "https://pmkisan.gov.in"
    }
  ]
}
```

---

### Report Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/reports/submit` | ❌ | Submit an anonymous civic grievance |
| `GET` | `/reports/track/{report_id}` | ❌ | Track a report by UUID with full status timeline |
| `GET` | `/reports/public` | ❌ | Aggregated report stats (total, by status, by category) |
| `GET` | `/reports/public/metrics` | ❌ | Privacy-preserving dashboard metrics (weekly aggregates) |
| `GET` | `/reports/map-data` | ❌ | Geotagged report coordinates for the heatmap |
| `GET` | `/reports/schemes/density-map` | ❌ | Scheme application counts per Indian state |
| `GET` | `/reports/admin/all` | ✅ JWT | All reports for the admin panel |
| `PATCH` | `/reports/{report_id}/status` | ✅ JWT | Update report status / escalation flag |

**`POST /reports/submit` — Request Body:**
```json
{
  "category": "corruption",
  "description": "PDS officer demanding bribe for ration card...",
  "photo_url": null,
  "lat": 22.5726,
  "lng": 88.3639
}
```

**Report Status Flow:**
```
submitted → under_review → in_progress → resolved
                ↕
           (escalated = true after 72h if still "submitted")
```

---

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/admin/login` | Exchange credentials for a JWT bearer token |

```bash
curl -X POST http://localhost:8000/admin/login \
  -d "username=admin&password=changeme" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

---

### Chat Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/chat` | Send a message to JanSuvidha Saathi (Gemini-powered) |

**Request:**
```json
{
  "message": "मुझे कौन सी सरकारी योजनाएं मिल सकती हैं?",
  "language": "hi",
  "history": []
}
```

**Response:**
```json
{
  "reply": "आपकी प्रोफ़ाइल के अनुसार आप PM-KISAN और Ayushman Bharat के लिए पात्र हो सकते हैं। क्या आप अपनी आय और उम्र बताना चाहेंगे?",
  "action": "match",
  "action_hint": null
}
```

Supported languages: `en` (English), `hi` (Hindi), `bn` (Bengali).

---

## 🤖 Machine Learning Pipeline

JanSuvidha uses a **multi-label XGBoost classifier** trained on synthetically generated citizen profiles to determine welfare scheme eligibility.

### How It Works

```
Citizen Profile Input
        │
        ▼
Rule Engine (rules.py)          ← Used for training label generation
  Deterministic eligibility      AND as ground-truth validation
  checks per scheme
        │
        ▼
Feature Encoding (features.py)  ← OrdinalEncoder for categorical features
  [income, age, occupation,         (occupation, gender, category, state)
   gender, category, state,
   land_ownership, student_status,
   family_size]
        │
        ▼
MultiOutputClassifier           ← One XGBClassifier per scheme
  (XGBoost × 15 schemes)
        │
        ▼
SHAP TreeExplainer              ← "Why you qualify" reasons
  Top-3 positive SHAP features     displayed as plain sentences
        │
        ▼
Ranked MatchResponse
```

### Training

```bash
# From backend/ directory
python -m app.models.train_model
```

The training script:
1. Generates 8,000 synthetic citizen profiles across realistic demographic ranges
2. Labels each profile against every scheme using the deterministic rule engine
3. Encodes features with `OrdinalEncoder`
4. Trains a `MultiOutputClassifier(XGBClassifier(...))` on 80% of data
5. Evaluates per-scheme F1 on the test set (micro-avg F1 typically >0.95)
6. Builds one `shap.TreeExplainer` per scheme estimator
7. Saves `model.pkl`, `encoder.pkl`, `scheme_names.pkl` to `app/ml_artifacts/`

> **Note on high accuracy:** The high F1 scores reflect that the model is learning to generalise clean, deterministic eligibility rules — not noisy real-world labels. This is by design, adding ML-based ranking and interpolation on top of the rule engine.

### Supported Schemes (15+)

| Category | Schemes |
|---|---|
| **Agriculture** | PM-KISAN, PM Fasal Bima Yojana, Kisan Credit Card |
| **Health** | Ayushman Bharat (PM-JAY) |
| **Women** | Beti Bachao Beti Padhao, Pradhan Mantri Matru Vandana Yojana |
| **Education** | Post Matric Scholarship (SC/ST), National Scholarship Portal schemes |
| **Labour** | MGNREGA, Pradhan Mantri Shram Yogi Maan-dhan |
| **Housing** | Pradhan Mantri Awas Yojana (Gramin & Urban) |
| **Social Security** | PM Jeevan Jyoti Bima Yojana, PM Suraksha Bima Yojana |

---

## 🗄 Database Schema

```
┌──────────────────────────────────────────┐
│                 reports                   │
├──────────────────────────────────────────┤
│ id          UUID (PK, auto-generated)     │
│ category    VARCHAR  (corruption, etc.)   │
│ description TEXT                          │
│ photo_url   VARCHAR (nullable)            │
│ lat         NUMERIC (nullable)            │
│ lng         NUMERIC (nullable)            │
│ status      VARCHAR  (submitted|...)      │
│ escalated   BOOLEAN  (default: false)     │
│ created_at  TIMESTAMP WITH TIME ZONE      │
│ updated_at  TIMESTAMP WITH TIME ZONE      │
└──────────────────┬───────────────────────┘
                   │ 1:many
┌──────────────────▼───────────────────────┐
│            report_status_log              │
├──────────────────────────────────────────┤
│ id          INTEGER (PK)                  │
│ report_id   UUID (FK → reports.id)        │
│ status      VARCHAR                       │
│ changed_at  TIMESTAMP WITH TIME ZONE      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                  schemes                  │  ← static seed data
├──────────────────────────────────────────┤
│ id                  INTEGER (PK)          │
│ name                VARCHAR               │
│ short_description   TEXT                  │
│ min_income / max_income  NUMERIC          │
│ occupation_list     VARCHAR[]             │
│ age_min / age_max   INTEGER               │
│ gender              VARCHAR               │
│ category_eligible   VARCHAR[]             │
│ state_scope         VARCHAR               │
│ land_ownership_required  BOOLEAN          │
│ student_status_required  BOOLEAN          │
│ document_checklist  VARCHAR[]             │
│ apply_url           VARCHAR               │
└──────────────────────────────────────────┘
```

---

## 📱 Pages & Features

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero landing, pillar feature cards, stats band, FAQ accordion |
| `/match` | **Scheme Match** | Multi-step form: demographics → income → occupation → state |
| `/match/results` | **Results** | Ranked scheme cards with confidence score, reasons, doc checklist, apply link |
| `/report` | **Report** | Geo-tagged anonymous civic grievance form with photo upload |
| `/track` | **Track** | Enter UUID to see live report status timeline |
| `/dashboard` | **Dashboard** | Public stats: bar chart (received vs resolved by week), pie chart (by category), interactive heatmap |
| `/admin` | **Admin** | Password-protected table of all reports with status update controls |
| *(Widget)* | **Chat** | Floating chatbot widget accessible on every page |

---

## 🔑 Admin Panel

The admin panel is protected by JWT authentication.

**Accessing the Admin Panel:**
1. Navigate to `/admin/login`
2. Log in with the default admin credentials (can be changed in `.env`):
   - **Username:** `admin`
   - **Password:** `changeme`
3. A JWT token is stored securely in `localStorage` and sent as `Authorization: Bearer <token>` on all admin API calls

**Admin capabilities:**
- View all submitted reports sorted by most recent
- Update report status: `submitted → under_review → in_progress → resolved`
- Toggle escalation flag
- All status changes are logged to `report_status_log` with a timestamp

---

## 🔒 Privacy & Ethics

JanSuvidha is designed with **privacy as a core feature**, not an afterthought:

- **No PII collected:** Reports have no name, phone, or email fields — this is intentional.
- **UUID-only tracking:** Citizens track their complaint with a UUID they're given at submission time.
- **Dashboard data suppression:** Category counts < 5 are merged into "Other (Low Volume)" to prevent deanonymisation.
- **Weekly grouping:** Time-series data is grouped by week, not day, to prevent single-incident identification.
- **ML on synthetic data:** The XGBoost model is trained on synthetically generated profiles — no real citizen data is used for training.

---

## 🧪 Running Tests

```bash
# Backend: rule engine unit tests
cd backend
python -m pytest app/models/test_rules.py -v

# Frontend: linting
cd frontend
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow conventional commits and ensure `npm run lint` and `pytest` pass before submitting.

---

## 📄 License

This project was built for **IEMHACKS 4.0** (Social Issues Track). All rights reserved by the team.

---

<div align="center">
  <sub>Built with ❤️ for Indian citizens · IEMHACKS 4.0</sub>
</div>
