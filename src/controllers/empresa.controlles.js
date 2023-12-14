const {Pool}= require('pg'); 

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password : 'eude123',	
    database : 'apppasantia',
    port : '5432'
} );

const getEmpresas = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Empresa');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empresas', error: error.message });
    }
}

const getEmpresa = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Empresa WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empresa', error: error.message });
    }
}

const createEmpresa = async (req, res) => {
    try {
        const { nombre, idUsuario } = req.body;
        const response = await pool.query('INSERT INTO Empresa (nombre, idUsuario) VALUES ($1, $2)', [nombre, idUsuario]);
        res.json({
            message: 'Empresa creada exitosamente',
            body: {
                empresa: {nombre, idUsuario}
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear empresa', error: error.message });
    }
};

const updateEmpresa = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, idUsuario } = req.body;
        const response = await pool.query('UPDATE Empresa SET nombre = $1, idUsuario = $2 WHERE id = $3', [nombre, idUsuario, id]);
        res.json(`Empresa ${id} actualizada exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar empresa', error: error.message });
    }
}

const deleteEmpresa = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM Empresa WHERE id = $1', [id]);
        res.json(`Empresa ${id} eliminada exitosamente`);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empresa', error: error.message });
    }
}

module.exports = {
    getEmpresas,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
}