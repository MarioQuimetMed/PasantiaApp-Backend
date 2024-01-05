const { Router } = require('express');
const router = Router();

const { createCarrera,getCarrera,getCarreras } = require('../controllers/carrera.controllers');

router.get('/carrera', getCarreras);
router.get('/carrera/:id', getCarrera);
router.post('/carrera', createCarrera);

module.exports = router;