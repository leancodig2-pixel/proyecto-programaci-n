from app import create_app

app = create_app()

if __name__ == '__main__':
    # Ejecución del servidor web
    app.run(debug=True, port=5000)
