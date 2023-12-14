const {Pool}= require('pg'); 

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password : 'eude123',	
    database : 'apppasantia',
    port : '5432'
} );

const getRoles = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Rol');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener roles', error: error.message });
    }
}

const getRol = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Rol WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rol', error: error.message });
    }
}

const createRol = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const response = await pool.query('INSERT INTO Rol (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion]);
        res.json({
            message: 'Rol creado exitosamente',
            body: {
                rol: {nombre, descripcion}
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear rol', error: error.message });
    }
};

const updateRol = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion } = req.body;
        const response = await pool.query('UPDATE Rol SET nombre = $1, descripcion = $2 WHERE id = $3', [nombre, descripcion, id]);
        res.json(`Rol ${id} actualizado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar rol', error: error.message });
    }
}

const deleteRol = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM Rol WHERE id = $1', [id]);
        res.json(`Rol ${id} eliminado exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar rol', error: error.message });
    }
}

module.exports = {
    getRoles,
    getRol,
    createRol,
    updateRol,
    deleteRol
}