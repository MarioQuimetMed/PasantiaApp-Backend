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
        const response = await pool.query('INSERT INTO Usuario (correo, contraseña, idRol) VALUES ($1, $2, $3)', [correo, contrasena, idRol]);
        res.json({
            message: 'Usuario creado exitosamente',
            body: {
                user: { correo, contrasena, idRol }
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