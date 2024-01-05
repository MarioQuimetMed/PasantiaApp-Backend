const express = require('express');
const app = express();

// Configuración de Multer para manejar la subida de archivos

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
//routes

app.use(require('./routes/usuario'));
app.use(require('./routes/rol'));
app.use(require('./routes/estudiante'));
app.use(require('./routes/empresa'));
app.use(require('./routes/auth'));
app.use(require('./routes/files'));
app.use(require('./routes/carrera'));
app.use(require('./routes/area'));
app.use(require('./routes/publicacion'));


app.listen(process.env.PORT);
console.log('Server on port', 3000);