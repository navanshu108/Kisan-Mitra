import os
import sys
import json
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

# Ensure api directory is in path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

load_dotenv()

from ai.gemma.harness import harness

app = FastAPI(title="Kisan Mitra AI")

def load_schemes():
    try:
        with open(os.path.join(BASE_DIR, "data/demo-schemes/schemes.json"), "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading schemes: {e}")
        return []

class SchemeRequest(BaseModel):
    stateId: str
    cropId: str
    landArea: float
    language: str = "en"
    stateName: str = ""
    cropName: str = ""
    
class ExplainRequest(BaseModel):
    scheme_id: str
    language: str = "en"

@app.post("/api/schemes")
def find_schemes(req: SchemeRequest):
    schemes_db = load_schemes()
    matched = []
    for scheme in schemes_db:
        state_match = scheme["stateId"] == "all" or scheme["stateId"] == req.stateId
        crop_match = "all" in scheme["cropIds"] or req.cropId in scheme["cropIds"]
        
        land_match = True
        lc = scheme.get("landConstraints", "None")
        if lc.startswith(">"):
            if req.landArea <= float(lc[1:]):
                land_match = False
                
        if state_match and crop_match and land_match:
            reasons = []
            if scheme["stateId"] != "all":
                reasons.append(f"Available in {req.stateName or req.stateId}")
            else:
                reasons.append("Available nationwide")
                
            if "all" not in scheme["cropIds"]:
                reasons.append(f"Relevant to {req.cropName or req.cropId} cultivation")
            else:
                reasons.append("Applies to all crops")
                
            reasons.append(f"Land size compatible ({req.landArea} acres)")
            
            cat = scheme.get("category", "")
            if cat == "fertilizer":
                reasons.append("Provides fertilizer/nutrient-related support")
            elif cat == "crop_protection":
                reasons.append("Addresses crop-protection needs")
            else:
                reasons.append("Addresses category requirements")

            scheme_copy = dict(scheme)
            scheme_copy["match_reasons"] = reasons
            matched.append(scheme_copy)
            
    return {
        "schemes": matched, 
        "ai_offline": not harness.is_available
    }

@app.post("/api/explain")
def explain_scheme(req: ExplainRequest):
    schemes_db = load_schemes()
    scheme_data = next((s for s in schemes_db if s["id"] == req.scheme_id), None)
    if not scheme_data:
        return {"explanation": "Scheme not found."}
        
    explanation = harness.generate_explanation(scheme_data, req.language)
    return {
        "explanation": explanation,
        "ai_offline": not harness.is_available
    }

@app.post("/api/document")
async def analyze_document(file: UploadFile = File(...), language: str = Form("en")):
    contents = await file.read()
    analysis = harness.analyze_document(contents, file.content_type, language)
    return {
        "analysis": analysis,
        "ai_offline": not harness.is_available
    }

# Fallback for debugging Vercel 
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Vercel API is running!"}
