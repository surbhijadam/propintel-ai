from groq import Groq
import os
import json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def classify_message(message):
    prompt = f"""
Classify this real estate tenant message.

Message:
{message}

Return ONLY JSON:
{{
  "urgency": "HIGH/MEDIUM/LOW",
  "intent": "Maintenance Request / Payment Inquiry / Complaint / General Inquiry"
}}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return json.loads(completion.choices[0].message.content) # type: ignore