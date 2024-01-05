const { Router } = require('express');
const router = Router();

const { createPublicacion,getPublicacion,getPublicaciones } = require('../controllers/publicacion.controllers');

router.get('/publicacion', getPublicaciones);
router.get('/publicacion/:id', getPublicacion);
router.post('/publicacion', createPublicacion);

module.exports = router;