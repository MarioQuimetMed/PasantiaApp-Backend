const {Pool}= require('pg'); 

// const pool = new Pool({
//     host : 'localhost',
//     user : 'postgres',
//     password : 'eude123',	
//     database : 'apppasantia',
//     port : '5432'
// } );

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

const getEstudiantes = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Estudiante');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estudiantes', error: error.message });
    }
}

const getEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Estudiante WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estudiante', error: error.message });
    }
}

const createEstudiante = async (req, res) => {
    try {
        const { correo, contraseña, nombres, apellidoPaterno, apellidoMaterno, telefono } = req.body;
        const idRol = 2; // 2 es el id del rol de estudiante
        const idCv = null; 
        // Verificar si el correo ya existe en la base de datos
        const correoExistente = await pool.query('SELECT * FROM Usuario WHERE correo = $1', [correo]);
        if (correoExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico.',
            });
        }
        // Crear el usuario
        const createUserResponse = await pool.query(
            'INSERT INTO Usuario (correo, contraseña,idRol) VALUES ($1, $2, $3) RETURNING id',
            [correo, contraseña,idRol]
        );
        const idUsuario = createUserResponse.rows[0].id;
        // Verificar si ya existe un estudiante con el mismo idUsuario
        const estudianteExistente = await pool.query('SELECT * FROM Estudiante WHERE idUsuario = $1', [idUsuario]);
        if (estudianteExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe el estudiante en el Sistema.',
            });
        }
        // Si no existe, proceder con la inserción del estudiante
        const response = await pool.query(
            'INSERT INTO Estudiante (nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv) VALUES ($1, $2, $3, $4, $5, $6)',
            [nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv]
        );

        res.json({
            message: 'Estudiante creado exitosamente',
            estudiante: {
                correo,
                contraseña,
                nombres,
                apellidoPaterno,
                apellidoMaterno,
                telefono,
                idUsuario,
                idCv, // O asigna el valor que desees para idCv
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estudiante', error: error.message });
    }
};

const updateEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv } = req.body;
        const response = await pool.query('UPDATE Estudiante SET nombres = $1, apellidoPaterno = $2, apellidoMaterno = $3, telefono = $4, idUsuario = $5, idCv = $6 WHERE id = $7', [nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv, id]);
        res.json(`Estudiante ${id} actualizado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estudiante', error: error.message });
    }
}

const deleteEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM Estudiante WHERE id = $1', [id]);
        res.json(`Estudiante ${id} eliminado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar estudiante', error: error.message });
    }
}

module.exports = {
    getEstudiantes,
    getEstudiante,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
}