from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_response(message, classification, entities):
    prompt = f"""
You are a professional real estate customer support assistant.

Original message:
{message}

Classification:
{classification}

Extracted entities:
{entities}

Generate a formal professional support reply.

Format exactly like:

Dear Tenant,

<acknowledge issue>

<what team will do>

<optional request for extra details>

Thank you,
PropIntel AI Support Team

Keep it concise and polished.
No markdown.
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return completion.choices[0].message.content # type: ignore