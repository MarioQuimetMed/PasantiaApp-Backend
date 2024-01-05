const {Pool}= require('pg'); 

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

const getAreas = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM Area');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Areas', error: error.message });
    }
}

const getArea = async (req, res) => {
    try {
        const {idCarrera} = req.body;
        const response = await pool.query('SELECT * FROM Area WHERE idCarrera = $1', [idCarrera]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Area', error: error.message });
    }
}

const createArea = async (req, res) => {
    try {
        const { nombre , idCarrera} = req.body;

        // Verificar si ya existe la Area en la bd
        const AreaExistente = await pool.query('SELECT * FROM Area WHERE nombre = $1', [nombre]);
        if (AreaExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'Ya existe una Area con este Nombre.',
            });
        }
        // Crear la Area
        const createAreaResponse = await pool.query(
            'INSERT INTO Area (nombre,idCarrera) VALUES ($1,$2) RETURNING id',
            [nombre,idCarrera]
        );
        const id = createAreaResponse.rows[0].id;
        res.json({
            message: 'Area Creada exitosamente',
            Area: {
                id,
                nombre,
                idCarrera,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear Area', error: error.message });
    }
};

module.exports = {
    getAreas,
    getArea,
    createArea,
}