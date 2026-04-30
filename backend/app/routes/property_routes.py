from flask import Blueprint, request, jsonify

from app import db
from app.models.property_model import Property

property_bp = Blueprint("property", __name__)


# ADD PROPERTY
@property_bp.route("/", methods=["POST"])
def add_property():

    data = request.get_json()

    new_property = Property()

    new_property.title = data.get("title")
    new_property.price = data.get("price")
    new_property.location = data.get("location")
    new_property.description = data.get("description")
    new_property.image = data.get("image")

    db.session.add(new_property)
    db.session.commit()

    return jsonify({
        "message": "Property added successfully"
    }), 201


# GET ALL PROPERTIES
@property_bp.route("/", methods=["GET"])
def get_properties():

    properties = Property.query.all()

    property_list = []

    for property_item in properties:
        property_list.append(property_item.to_dict())

    return jsonify(property_list), 200


# GET SINGLE PROPERTY
@property_bp.route("/<int:id>", methods=["GET"])
def get_single_property(id):

    property_item = Property.query.get(id)

    if not property_item:
        return jsonify({
            "message": "Property not found"
        }), 404

    return jsonify(property_item.to_dict()), 200


# UPDATE PROPERTY
@property_bp.route("/<int:id>", methods=["PUT"])
def update_property(id):

    property_item = Property.query.get(id)

    if not property_item:
        return jsonify({
            "message": "Property not found"
        }), 404

    data = request.get_json()

    property_item.title = data.get("title", property_item.title)
    property_item.price = data.get("price", property_item.price)
    property_item.location = data.get("location", property_item.location)
    property_item.description = data.get("description", property_item.description)
    property_item.image = data.get("image", property_item.image)

    db.session.commit()

    return jsonify({
        "message": "Property updated successfully"
    }), 200


# DELETE PROPERTY
@property_bp.route("/<int:id>", methods=["DELETE"])
def delete_property(id):

    property_item = Property.query.get(id)

    if not property_item:
        return jsonify({
            "message": "Property not found"
        }), 404

    db.session.delete(property_item)
    db.session.commit()

    return jsonify({
        "message": "Property deleted successfully"
    }), 200