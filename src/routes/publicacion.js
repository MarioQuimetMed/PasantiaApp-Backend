const { Router } = require('express');
const router = Router();

const { createPublicacion,getPublicacion,getPublicaciones , getMisPublicaciones } = require('../controllers/publicacion.controllers');

router.get('/publicacion', getPublicaciones);
router.get('/publicacion/:id', getPublicacion);
router.post('/publicacion', createPublicacion);
router.post('/Mipublicacion', getMisPublicaciones);

module.exports = router;