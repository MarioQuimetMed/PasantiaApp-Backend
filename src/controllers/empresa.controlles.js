const {Pool}= require('pg'); 


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

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
        const { correo, contraseña, nombre} = req.body;
        const idRol = 3; // Rol de empresa = 3

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
        // Verificar si ya existe una Empresa con el mismo idUsuario
        const estudianteExistente = await pool.query('SELECT * FROM Empresa WHERE idUsuario = $1', [idUsuario]);
        if (estudianteExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe la Empresa en el Sistema.',
            });
        }

        // Si no existe, proceder con la inserción del estudiante
        const response = await pool.query(
            'INSERT INTO Empresa (nombre, idUsuario) VALUES ($1, $2)',
            [nombre, idUsuario]
        );

        res.json({
            message: 'Empresa Creada exitosamente',
            Empresa: {
                correo,
                contraseña,
                nombre,
                idUsuario,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estudiante', error: error.message });
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