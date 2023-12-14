require('dotenv').config();
const e = require('express');
const jwt = require('jsonwebtoken');
const {Pool}= require('pg');

const pool = new Pool({
    host : process.env.PORT,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,	
    database : process.env.DB_NAME,
    port : '5432'
} );

const secretKey = process.env.SECRETORPRIVATEKEY;

const login = async (req, res) => { 
    
    try {
        const { correo, contrasena } = req.body;
        const response = await pool.query('SELECT * FROM Usuario WHERE correo = $1 AND contraseña = $2', [correo, contrasena]);
        if (response.rows.length > 0) {
            const token = jwt.sign({ usuario: response.rows[0].id }, secretKey, { expiresIn: '100y' });
            const usuario = response.rows[0];
            res.header('auth-token', token);
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
}

module.exports = {
    login
}