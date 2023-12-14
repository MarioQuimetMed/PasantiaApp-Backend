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
        const { nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv } = req.body;
        const response = await pool.query('INSERT INTO Estudiante (nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv) VALUES ($1, $2, $3, $4, $5, $6)', [nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv]);
        res.json({
            message: 'Estudiante creado exitosamente',
            body: {
                estudiante: {nombres, apellidoPaterno, apellidoMaterno, telefono, idUsuario, idCv}
            }
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