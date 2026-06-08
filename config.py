import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super_secret_key_corporativa_xyz_2026'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///usuarios.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
