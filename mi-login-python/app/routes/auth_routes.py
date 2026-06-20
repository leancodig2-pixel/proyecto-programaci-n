from flask import Blueprint, request
from app.controllers.auth_controller import AuthController
from flask import jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/', methods=['GET'])
def index():
    return AuthController.render_login()

@auth_bp.route('/register', methods=['GET'])
def register():
    return AuthController.render_register()

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    return AuthController.login_process(data)

@auth_bp.route('/api/register', methods=['POST'])
def do_register():
    data = request.get_json() or {}
    return AuthController.register_process(data)

@auth_bp.route('/dashboard', methods=['GET'])
def dashboard():
    return AuthController.render_dashboard()


@auth_bp.route('/api/login/google', methods=['POST'])
def login_google():
    data = request.get_json() or {}
    token = data.get('token')
    if not token:
        return jsonify({'message': 'Token de Google requerido.'}), 400

    user = AuthController.login_with_google(token)
    if not user:
        return jsonify({'message': 'Token inválido o verificación fallida.'}), 401

    return jsonify({
        'message': 'Inicio de sesión con Google exitoso.',
        'redirect_url': '/dashboard'
    }), 200
