from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    
    # Parámetros profesionales de control de intentos de fuerza bruta
    login_attempts = db.Column(db.Integer, default=0, nullable=False)
    lock_until = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        """Genera un hash seguro e irreversible para la contraseña."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Valida la contraseña contra el hash almacenado."""
        return check_password_hash(self.password_hash, password)

    @property
    def is_locked(self):
        """Verifica de manera activa si la cuenta está actualmente en periodo de bloqueo."""
        if self.lock_until and self.lock_until > datetime.utcnow():
            return True
        return False
