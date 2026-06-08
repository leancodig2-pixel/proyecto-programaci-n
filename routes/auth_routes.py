from flask import Blueprint, request
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/', methods=['GET'])
def index():
    return AuthController.render_login()

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    return AuthController.login_process(data)
