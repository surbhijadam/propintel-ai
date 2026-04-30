from flask import Blueprint, request, jsonify

from app import db
from app.models.ticket_model import Ticket

from app.agents.classifier_agent import classify_message
from app.agents.ner_agent import extract_entities
from app.agents.response_agent import generate_response

support_bp = Blueprint("support", __name__)


@support_bp.route("/triage", methods=["POST"])
def triage_support():

    data = request.get_json()
    message = data.get("message", "")

    classification = classify_message(message)
    entities = extract_entities(message)

    reply = generate_response(
        message,
        classification,
        entities
    )

    ticket = Ticket()

    ticket.original_message = message
    ticket.urgency = classification.get("urgency")
    ticket.intent = classification.get("intent")
    ticket.issue_type = entities.get("issue_type")
    ticket.flat_number = entities.get("flat_number")
    ticket.reply = reply
    ticket.status = "Open"

    db.session.add(ticket)
    db.session.commit()

    return jsonify({
        "ticket_id": ticket.id,
        "status": ticket.status,
        "original_message": message,
        "urgency": classification.get("urgency"),
        "intent": classification.get("intent"),
        "entities": entities,
        "issue_type": entities.get("issue_type"),
        "flat_number": entities.get("flat_number"),
        "reply": reply
    }), 200


@support_bp.route("/tickets", methods=["GET"])
def get_tickets():

    tickets = Ticket.query.order_by(
        Ticket.created_at.desc()
    ).all()

    ticket_list = []

    for ticket in tickets:
        ticket_list.append(ticket.to_dict())

    return jsonify(ticket_list), 200


@support_bp.route("/tickets/<int:ticket_id>/status", methods=["PUT"])
def update_ticket_status(ticket_id):

    data = request.get_json()
    new_status = data.get("status")

    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return jsonify({
            "message": "Ticket not found"
        }), 404

    ticket.status = new_status
    db.session.commit()

    return jsonify({
        "message": "Ticket status updated successfully",
        "ticket": ticket.to_dict()
    }), 200