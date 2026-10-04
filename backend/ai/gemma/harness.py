import os
import json
from google import genai
from google.genai import types
from typing import List, Dict, Any

# =====================================================================
# KISAN MITRA GEMMA HARNESS
# =====================================================================
# This harness wraps the Gemma/Gemini model to enforce:
# 1. Zero-hallucination grounding (must use structured scheme data)
# 2. Multilingual farmer-friendly translation
# 3. Multimodal document understanding
# =====================================================================

class KisanMitraHarness:
    def __init__(self):
        self.api_key = os.getenv("GEMMA_API_KEY")
        self.model_name = os.getenv("GEMMA_MODEL", "gemini-2.5-flash") # Fallback to available model
        
        # We handle missing API key gracefully for "offline mode" demo
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
            self.is_available = True
        else:
            self.client = None
            self.is_available = False

    def generate_explanation(self, scheme_data: Dict, language: str) -> str:
        if not self.is_available:
            return self._fallback_explanation(scheme_data, language)

        prompt = f"""
        You are a helpful assistant for Indian farmers. 
        Explain the following government scheme in simple, farmer-friendly terms.
        
        RULES:
        1. Base your explanation ONLY on the provided scheme data.
        2. Do NOT invent eligibility criteria, benefits, or documents.
        3. Explain it in the requested language code: {language}.
        4. Keep it under 4 sentences.
        5. Use a warm, encouraging tone.
        
        SCHEME DATA:
        {json.dumps(scheme_data, indent=2)}
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.2, # Low temperature for grounding
                )
            )
            return response.text
        except Exception as e:
            print(f"Gemma Harness Error: {e}")
            return self._fallback_explanation(scheme_data, language)

    def analyze_document(self, image_bytes: bytes, mime_type: str, language: str) -> str:
        if not self.is_available:
            return "AI service is currently unavailable. Please verify documents manually."

        prompt = f"""
        You are an assistant for Indian farmers. 
        The user has uploaded a photo of a government scheme notice or agricultural document.
        
        1. Identify if this is a government scheme document.
        2. Extract the key benefits and deadlines (if any).
        3. Explain what the farmer needs to do based on this document.
        4. Respond in the requested language code: {language}.
        5. If the document is unreadable or irrelevant, gently state that.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[
                    types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                    prompt
                ],
                config=types.GenerateContentConfig(
                    temperature=0.1,
                )
            )
            return response.text
        except Exception as e:
            print(f"Gemma Harness Error (Multimodal): {e}")
            return "Could not analyze the document at this time. Please try again later."
            
    def _fallback_explanation(self, scheme_data: Dict, language: str) -> str:
        # Fallback dictionary for basic translations
        fallbacks = {
            "en": f"This is the {scheme_data['name']}. Benefit: {scheme_data['benefit']}. You are eligible if: {scheme_data['eligibility']}.",
            "hi": f"यह {scheme_data['name']} है। लाभ: {scheme_data['benefit']}। पात्रता: {scheme_data['eligibility']}।",
            "mr": f"ही {scheme_data['name']} आहे. लाभ: {scheme_data['benefit']}. पात्रता: {scheme_data['eligibility']}."
        }
        return fallbacks.get(language, fallbacks["en"])

harness = KisanMitraHarness()
