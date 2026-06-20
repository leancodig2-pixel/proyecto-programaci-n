from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, text
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config.from_object(Config)

    db.init_app(app)

    # Registro de rutas usando Blueprints
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    # Crear tablas si no existen y ajustar esquema si falta la columna 'name'
    with app.app_context():
        from app.models.user import User

        inspector = inspect(db.engine)
        if 'users' in inspector.get_table_names():
            columns = [column['name'] for column in inspector.get_columns('users')]
            if 'name' not in columns:
                db.session.execute(text('ALTER TABLE users ADD COLUMN name VARCHAR(120)'))

        db.create_all()

        if User.query.first() is None:
            default_user = User(name='Admin', email='admin@correo.com')
            default_user.set_password('Admin123')
            db.session.add(default_user)
            db.session.commit()

    return app
