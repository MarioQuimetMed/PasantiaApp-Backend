const {Pool}= require('pg'); 
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { Storage } = require('@google-cloud/storage');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

const storage = new Storage({
  projectId: 'macro-campaign-405503',
  keyFilename: process.env.LLAVECLOUD || './credencial/macro-campaign-405503-543f528d0052.json' ,
});

const bucket = storage.bucket('curriculums-app-pa');

const upload = multer({ storage: multer.memoryStorage() });

const subirPdf = async (req, res) => {
  try {
    const archivo = req.file;
    if (!archivo) {
      return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
    }
    const idEstudiante= req.body.idEstudiante;
    const nombreArchivo = `${Date.now()}-${archivo.originalname}`;
    const file = bucket.file(nombreArchivo);

    const stream   = file.createWriteStream({
      metadata: {
        contentType: archivo.mimetype,
        predefinedAcl: 'publicRead', // Configurar para acceso público
      },
    });

    stream.on('error', (err) => {
      console.error('Error al subir el archivo a Google Cloud Storage:', err);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    });

    stream.on('finish', () => {
      console.log(idEstudiante  );
      const url=file.publicUrl();
      pool.query('UPDATE Estudiante SET idCv=$1 WHERE id=$2', [url,idEstudiante]);
      res.json({ mensaje: 'Archivo subido correctamente', url: file.publicUrl() });
    });

    stream.end(archivo.buffer);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  subirPdf,
}
