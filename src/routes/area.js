const { Router } = require('express');
const router = Router();

const { createArea,getArea,getAreas} = require('../controllers/area.controllers');

router.get('/areas', getAreas);
router.post('/area', getArea);
router.post('/CrearArea', createArea);

module.exports = router;