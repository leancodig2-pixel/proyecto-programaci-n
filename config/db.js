const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Tu contraseña de MySQL
    database: 'sistema_login',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();
