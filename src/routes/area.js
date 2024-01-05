const { Router } = require('express');
const router = Router();

const { createArea,getArea,getAreas} = require('../controllers/area.controllers');

router.get('/area', getAreas);
router.get('/area/:id', getArea);
router.post('/area', createArea);

module.exports = router;