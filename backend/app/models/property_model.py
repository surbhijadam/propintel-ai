from app import db

class Property(db.Model):

    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    price = db.Column(db.Integer, nullable=False)

    location = db.Column(db.String(200), nullable=False)

    description = db.Column(db.Text, nullable=False)

    image = db.Column(db.String(500))

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "price": self.price,
            "location": self.location,
            "description": self.description,
            "image": self.image
        }