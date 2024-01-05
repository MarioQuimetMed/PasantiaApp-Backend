const {Pool}= require('pg'); 

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

  const getPublicaciones = async (req, res) => {
    try {
        const response = await pool.query('SELECT publicacion.id, publicacion.nombre as nombrePub, TO_CHAR(fechaInicio, \'DD-MM-YYYY\') as fechaInicio, TO_CHAR(fechaFin, \'DD-MM-YYYY\') as fechaFin, idEmpresa ,Empresa.nombre as Empresa, requisitos, idArea,Area.nombre as Area, Publicacion.idCarrera , Carrera.nombre as Carrera FROM Publicacion,Empresa,Area,Carrera where Publicacion.idEmpresa = Empresa.id and Publicacion.idArea = Area.id and Area.idCarrera = Carrera.id');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Publicaciones', error: error.message });
    }
}

const getPublicacion = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM Publicacion WHERE id = $1', [id]);
        const requisitos = await pool.query('SELECT requisitos FROM Publicacion WHERE id = $1', [id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Publicacion', error: error.message });
    }
}

const createPublicacion = async (req, res) => {
    try {
        const { nombre ,fechaInicio , fechaFin , idEmpresa , requisitos,idArea,idCarrera} = req.body;
        
        requisitosJson = JSON.stringify(requisitos);
        // Crear la Publicacion
        const createCarreraResponse = await pool.query(
            'INSERT INTO Publicacion (nombre ,fechaInicio , fechaFin , idEmpresa , requisitos,idArea,idCarrera) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
            [nombre ,fechaInicio , fechaFin , idEmpresa , requisitos,idArea,idCarrera]
        );
    

        res.json({
            message: 'Publicacion Creada exitosamente',
            Publicacion: {
                nombre ,
                fechaInicio ,
                fechaFin ,
                idEmpresa , 
                requisitos,
                idArea,
                idCarrera
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear Publicacion', error: error.message });
    }
};

module.exports = {
    getPublicaciones,
    getPublicacion,
    createPublicacion,
}