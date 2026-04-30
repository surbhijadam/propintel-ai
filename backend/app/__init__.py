from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():

    app = Flask(__name__)

    app.config.from_object("app.config.Config")

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # IMPORT HERE
    from app.routes.auth_routes import auth_bp
    from app.routes.property_routes import property_bp
    from app.routes.quiz_routes import quiz_bp
    from app.routes.support_routes import support_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(property_bp, url_prefix="/api/properties")
    app.register_blueprint(quiz_bp, url_prefix="/api/quiz")
    app.register_blueprint(support_bp, url_prefix="/api/support")

    @app.route("/")
    def home():
        return {"message": "PropIntel AI Backend Running"}

    with app.app_context():

        from app.models.user_model import User
        from app.models.property_model import Property
        from app.models.quiz_history_model import QuizHistory
        from app.models.ticket_model import Ticket

        db.create_all()

    return app