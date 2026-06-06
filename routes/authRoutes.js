const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Ruta POST para validar el login
router.post('/login', AuthController.login);

// Ruta GET para extraer todos los usuarios existentes de la Base de Datos
router.get('/usuarios', AuthController.listUsers);

module.exports = router;
