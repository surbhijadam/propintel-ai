from groq import Groq
import os
import json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_entities(message):
    prompt = f"""
Extract entities from this real estate tenant message.

Message:
{message}

Return ONLY JSON:
{{
  "flat_number": "",
  "tenant_id": "",
  "property_address": "",
  "person_name": "",
  "issue_type": "",
  "date_or_duration": ""
}}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return json.loads(completion.choices[0].message.content) # type: ignore