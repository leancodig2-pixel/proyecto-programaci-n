const UserModel = require('../models/userModel');

class AuthController {
    // Procesa el inicio de sesión ordinario
    static async login(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Por favor, rellena todos los campos (Nombre, Correo y Contraseña).' 
            });
        }

        try {
            const user = await UserModel.findByCredentials(name, email);

            if (!user || user.password !== password) {
                return res.status(401).json({ 
                    status: 'error', 
                    message: 'Datos incorrectos. Verifica tu nombre, correo o contraseña.' 
                });
            }

            return res.status(200).json({
                status: 'success',
                message: '¡Inicio de sesión exitoso! Bienvenido al sistema.'
            });

        } catch (error) {
            console.error("Error en el servidor:", error);
            return res.status(500).json({ 
                status: 'error', 
                message: 'Error interno del servidor al procesar la solicitud.' 
            });
        }
    }

    // Envía la lista de todos los usuarios registrados al Frontend simulador
    static async listUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error al listar usuarios:", error);
            return res.status(500).json({ status: 'error', message: 'No se pudieron obtener los usuarios.' });
        }
    }
}

module.exports = AuthController;
