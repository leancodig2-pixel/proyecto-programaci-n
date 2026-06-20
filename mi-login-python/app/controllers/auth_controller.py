from flask import jsonify, render_template
from app.models.user import User
from app import db
import requests

class AuthController:

    @staticmethod
    def render_login():
        return render_template('login.html')

    @staticmethod
    def render_register():
        return render_template('register.html')

    @staticmethod
    def render_dashboard():
        return render_template('success.html')

    @staticmethod
    def login_process(data):
        email = (data.get('email') or '').strip()
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Por favor, completa el correo y la contraseña."}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"message": "Correo o contraseña incorrectos."}), 401

        return jsonify({
            "message": "¡Inicio de sesión exitoso! Redirigiendo al panel...",
            "redirect_url": "/dashboard"
        }), 200

    @staticmethod
    def login_with_google(token):
        # Valida el token de Google (cliente) usando la API de Google
        try:
            resp = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}', timeout=5)
            if resp.status_code != 200:
                return None
            info = resp.json()
            # info contiene 'email' y 'email_verified' cuando es válido
            if not info.get('email_verified'):
                return None

            email = info.get('email')
            name = info.get('name') or email.split('@')[0]

            user = User.query.filter_by(email=email).first()
            if not user:
                user = User(name=name, email=email)
                # No establecer contraseña para usuarios OAuth (puede establecerse una aleatoria)
                user.set_password('')
                db.session.add(user)
                db.session.commit()

            return user
        except Exception:
            return None

    @staticmethod
    def register_process(data):
        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip()
        password = data.get('password')
        confirm = data.get('confirm')

        if not name or not email or not password or not confirm:
            return jsonify({"message": "Por favor, completa todos los campos."}), 400

        if '@' not in email or '.' not in email:
            return jsonify({"message": "Ingresa un correo válido."}), 400

        if password != confirm:
            return jsonify({"message": "Las contraseñas no coinciden."}), 400

        if len(password) < 6:
            return jsonify({"message": "La contraseña debe tener al menos 6 caracteres."}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Ya existe una cuenta con ese correo."}), 400

        user = User(name=name, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({
            "message": "Registro exitoso. Ya puedes iniciar sesión.",
            "redirect_url": "/"
        }), 201
