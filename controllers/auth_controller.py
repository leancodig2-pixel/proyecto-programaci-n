from flask import jsonify, render_template
from app.models.user import User
from app import db
from datetime import datetime, timedelta

class AuthController:

    @staticmethod
    def render_login():
        """Renderiza la vista principal del sistema (login.html)"""
        return render_template('login.html')

    @staticmethod
    def login_process(data):
        """Procesa de forma segura las credenciales de acceso."""
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Por favor, complete todos los campos."}), 400

        user = User.query.filter_by(email=email).first()

        # Mitigación contra enumeración de usuarios en ataques maliciosos
        if not user:
            return jsonify({"message": "Correo electrónico o contraseña incorrectos."}), 401

        # Control del estado de bloqueo temporal
        if user.is_locked:
            time_left = user.lock_until - datetime.utcnow()
            minutes_left = max(1, round(time_left.total_seconds() / 60))
            return jsonify({
                "message": f"Acceso restringido temporalmente. Intente nuevamente en {minutes_left} min."
            }), 423

        # Validación estricta de credenciales
        if not user.check_password(password):
            user.login_attempts += 1
            
            # Bloqueo definitivo al alcanzar el límite exacto de 3 errores
            if user.login_attempts >= 3:
                user.lock_until = datetime.utcnow() + timedelta(minutes=15)
                db.session.commit()
                return jsonify({
                    "message": "Seguridad activada: Has alcanzado el límite de 3 intentos. Cuenta bloqueada por 15 minutos."
                }), 423
            
            db.session.commit()
            intentos_restantes = 3 - user.login_attempts
            return jsonify({
                "message": f"Contraseña incorrecta. Le quedan {intentos_restantes} intentos."
            }), 401

        # Restablecimiento exitoso de parámetros de control tras login correcto
        user.login_attempts = 0
        user.lock_until = None
        db.session.commit()

        return jsonify({
            "message": "Autenticación exitosa. Redirigiendo de forma segura...",
            "user": {"email": user.email}
        }), 200
