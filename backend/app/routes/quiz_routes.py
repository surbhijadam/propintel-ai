from flask import Blueprint, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os
import json
from app import db
from app.models.quiz_history_model import QuizHistory

from app.rag.rag_pipeline import retrieve_context

load_dotenv()

quiz_bp = Blueprint("quiz", __name__)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


@quiz_bp.route("/generate", methods=["POST"])
def generate_quiz():

    data = request.get_json()

    topic = data.get("topic")
    difficulty = data.get("difficulty")

    context = retrieve_context(topic)

    prompt = f"""
You are a real estate tutor.

Using this knowledge:

{context}

Generate ONE {difficulty} multiple choice question on {topic}.

Return ONLY JSON:

{{
    "question": "...",
    "options": [
        "A. ...",
        "B. ...",
        "C. ...",
        "D. ..."
    ],
    "correct_answer": "A",
    "hint": "..."
}}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7
    )

    response_text = completion.choices[0].message.content

    quiz = json.loads(response_text) # type: ignore

    return jsonify(quiz)


@quiz_bp.route("/evaluate", methods=["POST"])
def evaluate_answer():

    data = request.get_json()

    answer = data.get("answer")
    question = data.get("question")
    correct_answer = data.get("correct_answer")

    is_correct = answer == correct_answer

    prompt = f"""
You are a real estate tutor.

Question:
{question}

User selected:
{answer}

Correct answer:
{correct_answer}

The user's answer is {"correct" if is_correct else "incorrect"}.

Return ONLY valid JSON in this format:

{{
    "correct": true/false,
    "message": "...",
    "explanation": "...",
    "real_world_example": "...",
    "memory_tip": "..."
}}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5
    )

    response_text = completion.choices[0].message.content

    result = json.loads(response_text) # type: ignore

    history = QuizHistory()
    history.user_id = None
    history.topic = data.get("topic")
    history.difficulty = data.get("difficulty")
    history.question = question
    history.selected_answer = answer
    history.correct_answer = correct_answer
    history.is_correct = result.get("correct")
    history.explanation = result.get("explanation")

    db.session.add(history)
    db.session.commit()

    return jsonify(result), 200

@quiz_bp.route("/history", methods=["GET"])
def get_quiz_history():

    history_items = QuizHistory.query.order_by(
        QuizHistory.created_at.desc()
    ).all()

    history_list = []

    for item in history_items:
        history_list.append(item.to_dict())

    return jsonify(history_list), 200

@quiz_bp.route("/recommendation", methods=["GET"])
def get_recommendation():

    history = QuizHistory.query.all()

    if not history:
        return jsonify({
            "message": "Start taking quizzes to receive recommendations."
        }), 200

    topic_stats = {}

    for item in history:

        if item.topic not in topic_stats:
            topic_stats[item.topic] = {
                "total": 0,
                "correct": 0
            }

        topic_stats[item.topic]["total"] += 1

        if item.is_correct:
            topic_stats[item.topic]["correct"] += 1

    weakest_topic = None
    weakest_score = 100

    strongest_topic = None
    strongest_score = 0

    for topic, stats in topic_stats.items():

        accuracy = (
            stats["correct"] / stats["total"]
        ) * 100

        if accuracy < weakest_score:
            weakest_score = accuracy
            weakest_topic = topic

        if accuracy > strongest_score:
            strongest_score = accuracy
            strongest_topic = topic

    recommended_difficulty = "Beginner"

    if strongest_score > 60:
        recommended_difficulty = "Intermediate"

    if strongest_score > 80:
        recommended_difficulty = "Advanced"

    return jsonify({
        "needs_improvement": weakest_topic,
        "strong_topic": strongest_topic,
        "recommended_difficulty": recommended_difficulty,
        "message": f"Practice more questions on {weakest_topic} and try {recommended_difficulty} level quizzes."
    }), 200