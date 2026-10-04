import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMMA_API_KEY"))

try:
    part = types.Part.from_bytes(data=b"test", mime_type="text/plain")
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[part, "Analyze this"]
    )
    print("Success")
except Exception as e:
    print(f"Error: {e}")
