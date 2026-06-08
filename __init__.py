from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    # Inicialización de Flask con mapeo explícito de carpetas frontend
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config.from_object(Config)

    db.init_app(app)

    # Inyección del Blueprint de autenticación
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    # Mapeo y generación automática de la Base de Datos SQLite
    with app.app_context():
        db.create_all()

    return app
