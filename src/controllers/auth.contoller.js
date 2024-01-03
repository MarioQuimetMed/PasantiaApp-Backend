require('dotenv').config();
const e = require('express');
const jwt = require('jsonwebtoken');
const {Pool}= require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

const secretKey = process.env.SECRETORPRIVATEKEY;

const login = async (req, res) => { 
    
    try {
        const { correo, contrasena } = req.body;
        const response = await pool.query('SELECT * FROM Usuario WHERE correo = $1 AND contraseña = $2', [correo, contrasena]);
        if (response.rows.length > 0) {
            const token = jwt.sign({ usuario: response.rows[0].id }, secretKey, { expiresIn: '100y' });
            const usuario = response.rows[0];
            const idEstudiante = await pool.query('SELECT id FROM Estudiante WHERE idUsuario = $1', [usuario.id]);
            const idEmpresa = await pool.query('SELECT id FROM Empresa WHERE idUsuario = $1', [usuario.id]);
            res.header('auth-token', token);
            res.status(200).json(
                {
                    usuario,
                    idEstudiante: idEstudiante.rows.length > 0 ? idEstudiante.rows[0].id : null,
                    idEmpresa: idEmpresa.rows.length > 0 ? idEmpresa.rows[0].id : null, 

                }
            );
        } else {
            res.status(404).json({ message: 'Contraseña o Correo incorrecto' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
}

module.exports = {
    login
}