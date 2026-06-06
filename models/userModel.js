const db = require('../config/db');

class UserModel {
    // Busca un usuario que coincida con el nombre Y el correo electrónico
    static async findByCredentials(name, email) {
        const [rows] = await db.execute(
            'SELECT * FROM usuarios WHERE name = ? AND email = ?', 
            [name, email]
        );
        return rows[0]; 
    }

    // Obtiene absolutamente todos los usuarios de la base de datos para el bucle del simulador
    static async getAllUsers() {
        const [rows] = await db.execute('SELECT name, email, password FROM usuarios');
        return rows;
    }
}

module.exports = UserModel;
