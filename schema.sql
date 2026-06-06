CREATE DATABASE IF NOT EXISTS sistema_login;
USE sistema_login;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insertamos varios usuarios de prueba para que el bucle tenga material para mezclar
INSERT INTO usuarios (name, email, password) VALUES 
('Carlos', 'carlos@correo.com', '123456'),
('Ana', 'ana@correo.com', 'abc987'),
('Pedro', 'pedro@correo.com', 'password321')
ON DUPLICATE KEY UPDATE name=name;
