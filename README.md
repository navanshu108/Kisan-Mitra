# Kisan Mitra AI 🌾

**"Making government scheme discovery simpler for farmers."**

Kisan Mitra AI is a multilingual, multimodal, and grounded AI assistant designed to help Indian farmers discover and understand relevant government agricultural schemes. 

This project was built to satisfy the **Best Use of Gemma 4** and **Best Open-Source AI Project** categories, emphasizing a zero-hallucination architecture, meaningful model harnesses, and specialized agent skills.

## 🌟 Key Features

1. **Guided Scheme Discovery**: Farmers input 3 simple details (State, Crop, Land Area).
2. **Multilingual Farmer-First UX**: Full support for English, Hindi, and Marathi (extensible to all Indian languages) with state-preserving language switching.
3. **Multimodal Document Understanding**: Upload photos of scheme notices and get simplified, translated explanations.
4. **Voice Accessibility**: Reads scheme explanations aloud in the selected regional language.
5. **Zero-Hallucination Architecture**: AI is restricted to explaining official, verified scheme data.
6. **Graceful Fallback**: The app continues to work even if the AI API is temporarily unavailable.

---

## 🧠 How Kisan Mitra AI Uses Gemma 4

Gemma 4 is the core intelligence layer of Kisan Mitra AI. It is NOT treated as a generic chatbot or a database of facts. Instead, it is used for:

1. **Explanation & Simplification**: Gemma translates complex government eligibility criteria into simple, 3-4 sentence explanations.
2. **Multilingual Transformation**: Gemma translates these explanations natively into the farmer's requested language.
3. **Multimodal Interpretation**: Gemma Vision extracts text, context, and intent from uploaded photos of government notices.
4. **Agent Assistance**: Gemma acts as the reasoning engine for the Kisan Scheme Discovery Agent.

**Architecture Flow:**
`Farmer Input -> Structured DB Retrieval -> Relevant Context -> Gemma 4 -> Translated & Simplified Output`

**What Gemma is NOT allowed to do:**
Gemma cannot invent schemes, eligibility requirements, or application URLs. All data is grounded in a verified structured dataset.

---

## 🛠 Kisan Mitra Gemma Harness

This repository includes a custom, original implementation of a Model Harness located at `backend/ai/gemma/harness.py`. 

**Why it exists:**
Standard API wrappers do not enforce domain-specific constraints. We needed a harness that guarantees safety for government information.

**Features of the Harness:**
- **Structured Context Injection**: Automatically wraps user prompts with retrieved scheme data.
- **Multilingual Routing**: Injects language constraints dynamically.
- **Multimodal Preparation**: Handles image byte formatting for vision models.
- **Fallback Handling**: If the API is offline or times out, it gracefully falls back to deterministic pre-translated templates, ensuring the farmer is never left stranded.

---

## 🤖 Kisan Mitra Scheme Discovery Agent Skill

The project implements an Agent Skill following the Agent Skill Open Standard, located in `skills/kisan-mitra-scheme-discovery/SKILL.md`.

This defines the exact inputs, tools, and zero-hallucination boundaries the agent must respect when interacting with the scheme database.

---

## 📦 Project Structure

```
kisan-mitra-ai/
│
├── frontend/             # Vanilla JS + HTML + Tailwind (Zero Build Step)
│   ├── css/
│   ├── js/app.js         # Core UI logic, Multilingual state, TTS
│   └── index.html        # Farmer-first UI
│
├── backend/              # FastAPI Python Backend
│   ├── main.py           # API Endpoints (Schemes, Explain, Document)
│   ├── ai/gemma/         # Custom Model Harness
│   └── agents/           # Agent Logic
│
├── skills/               # Agent Skill Open Standard Definition
│
├── data/demo-schemes/    # Structured scheme JSON database
│
├── .env.example
├── .gitignore
├── LICENSE               # Apache 2.0
└── README.md
```

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/kisan-mitra-ai.git
   cd kisan-mitra-ai
   ```

2. **Set up the virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt # (or pip install fastapi uvicorn google-genai python-multipart pydantic python-dotenv)
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMMA_API_KEY (Gemini API Key)
   ```

4. **Run the server:**
   ```bash
   python -m uvicorn backend.main:app --reload
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:8000`

---

## ⚖️ Open-Source Compliance & License

This project is open-source under the **Apache License 2.0**. 
See the `LICENSE` file for more details.

**Attributions:**
- Backend: FastAPI, Pydantic, Uvicorn
- Frontend: TailwindCSS, FontAwesome
- AI SDK: `google-genai`

This is an original implementation designed for the hackathon, leveraging open-source tools and Gemma open models via the API.
