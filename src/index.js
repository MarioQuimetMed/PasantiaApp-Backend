const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
//routes

app.use(require('./routes/usuario'));
app.use(require('./routes/rol'));
app.use(require('./routes/estudiante'));
app.use(require('./routes/empresa'));
app.use(require('./routes/auth'));


app.listen(process.env.PORT);
console.log('Server on port', 3000);