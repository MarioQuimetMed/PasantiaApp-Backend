const e = require('express');
const {Pool}= require('pg'); 
require('dotenv').config();

// const pool = new Pool({
//     host : process.env.PORT,
//     user : process.env.DB_USERNAME,
//     password : process.env.DB_PASSWORD,	
//     database : process.env.DB_NAME,
//     port : '5432'
// } );

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

const getUsuarios = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Usuario');
        console.log(response.rows);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
}

const createUsuario = async (req, res) => {
    try {
        const { correo, contrasena, idRol } = req.body;
        // Verificar si el correo ya existe en la base de datos
        const correoExistente = await pool.query('SELECT * FROM Usuario WHERE correo = $1', [correo]);
        if (correoExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico.',
            });
        }
        // Si el correo no existe, proceder con la inserción
        const response = await pool.query('INSERT INTO Usuario (correo, contraseña, idRol) VALUES ($1, $2, $3)', [correo, contrasena, idRol]);
        const respuesta = await pool.query('SELECT id FROM Usuario WHERE correo = $1 and contraseña = $2', [correo,contrasena]);
        const id = respuesta.rows[0].id;

        res.json({
            message: 'Usuario creado exitosamente',
            body: {
                user: { correo, contrasena, id, idRol }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

const getUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
}

const updateUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const { correo, contrasena, idRol } = req.body;
        const response = await pool.query('UPDATE Usuario SET correo = $1, contrasena = $2, idRol = $3 WHERE id = $4', [correo, contrasena, idRol, id]);
        res.json(`Usuario ${id} actualizado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM Usuario WHERE id = $1', [id]);
        res.json(`Usuario ${id} eliminado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
}