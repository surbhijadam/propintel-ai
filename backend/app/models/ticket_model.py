from app import db


class Ticket(db.Model):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)

    original_message = db.Column(db.Text, nullable=False)

    urgency = db.Column(db.String(20))
    intent = db.Column(db.String(100))
    issue_type = db.Column(db.String(100))
    flat_number = db.Column(db.String(50))

    reply = db.Column(db.Text)

    status = db.Column(
        db.String(20),
        default="Open"
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "original_message": self.original_message,
            "urgency": self.urgency,
            "intent": self.intent,
            "issue_type": self.issue_type,
            "flat_number": self.flat_number,
            "reply": self.reply,
            "status": self.status,
            "created_at": str(self.created_at)
        }