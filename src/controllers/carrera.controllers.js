const {Pool}= require('pg'); 

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

const getCarreras = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Carrera');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Carreras', error: error.message });
    }
}

const getCarrera = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Carrera WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Carrera', error: error.message });
    }
}

const createCarrera = async (req, res) => {
    try {
        const { nombre} = req.body;

        // Verificar si ya existe la carrera en la bd
        const CarreraExistente = await pool.query('SELECT * FROM Carrera WHERE nombre = $1', [nombre]);
        if (CarreraExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe una Carrera con este Nombre.',
            });
        }
        // Crear la carrera
        const createCarreraResponse = await pool.query(
            'INSERT INTO Carrera (nombre) VALUES ($1) RETURNING id',
            [nombre]
        );
        const idCarrera = createCarreraResponse.rows[0].id;

        res.json({
            message: 'Carrera Creada exitosamente',
            Carrera: {
                idCarrera,
                nombre,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estudiante', error: error.message });
    }
};

module.exports = {
    getCarreras,
    getCarrera,
    createCarrera,
}