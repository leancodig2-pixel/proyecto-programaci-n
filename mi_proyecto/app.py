from flask import Flask, render_template, request, redirect, url_for, session, g
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'clave_secreta_augusto_2026'

# Rutas y base de datos local
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'data.db')

# Datos por defecto para crear el usuario inicial
USUARIO_CORRECTO = {
    "nombre": "Augusto",
    "correo": "augusto@correo.com",
    "contrasena": "1234"
}

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
    return db

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT UNIQUE,
        contrasena TEXT
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS logins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        correo TEXT,
        success INTEGER,
        timestamp TEXT,
        ip TEXT
    )''')
    # Crear usuario por defecto si no existe
    c.execute("SELECT id FROM users WHERE correo=?", (USUARIO_CORRECTO['correo'],))
    if not c.fetchone():
        c.execute("INSERT INTO users (nombre, correo, contrasena) VALUES (?, ?, ?)",
                  (USUARIO_CORRECTO['nombre'], USUARIO_CORRECTO['correo'], USUARIO_CORRECTO['contrasena']))
    conn.commit()
    conn.close()

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def home():
    if 'usuario' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        correo = request.form.get('correo', '').strip()
        contrasena = request.form.get('contrasena', '').strip()

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT nombre FROM users WHERE correo=? AND contrasena=?", (correo, contrasena))
        row = c.fetchone()
        success = 1 if row else 0
        # Guardar intento de inicio de sesión
        c.execute("INSERT INTO logins (correo, success, timestamp, ip) VALUES (?, ?, ?, ?)",
                  (correo, success, datetime.utcnow().isoformat(), request.remote_addr))
        conn.commit()
        conn.close()

        if success:
            session['usuario'] = row[0]
            return redirect(url_for('dashboard'))
        else:
            error = "Correo o contraseña incorrectos."

    return render_template('login.html', error=error)


@app.route('/dashboard')
def dashboard():
    if 'usuario' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html', nombre=session['usuario'])


@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        correo = request.form.get('correo', '').strip()
        contrasena = request.form.get('contrasena', '').strip()
        if not nombre or not correo or not contrasena:
            error = 'Completa todos los campos.'
        else:
            try:
                conn = sqlite3.connect(DB_PATH)
                c = conn.cursor()
                c.execute("INSERT INTO users (nombre, correo, contrasena) VALUES (?, ?, ?)", (nombre, correo, contrasena))
                conn.commit()
                conn.close()
                return redirect(url_for('login'))
            except sqlite3.IntegrityError:
                error = 'El correo ya está registrado.'

    return render_template('register.html', error=error)


@app.route('/logs')
def logs():
    if 'usuario' not in session:
        return redirect(url_for('login'))
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT correo, success, timestamp, ip FROM logins ORDER BY id DESC LIMIT 200")
    rows = c.fetchall()
    conn.close()
    return render_template('logs.html', rows=rows)


if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
