from app import db

class QuizHistory(db.Model):

    __tablename__ = "quiz_history"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, nullable=True)

    topic = db.Column(db.String(100), nullable=False)

    difficulty = db.Column(db.String(50), nullable=False)

    question = db.Column(db.Text, nullable=False)

    selected_answer = db.Column(db.String(10), nullable=False)

    correct_answer = db.Column(db.String(10), nullable=False)

    is_correct = db.Column(db.Boolean, nullable=False)

    explanation = db.Column(db.Text)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "topic": self.topic,
            "difficulty": self.difficulty,
            "question": self.question,
            "selected_answer": self.selected_answer,
            "correct_answer": self.correct_answer,
            "is_correct": self.is_correct,
            "explanation": self.explanation,
            "created_at": self.created_at
        }