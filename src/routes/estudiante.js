const { Router } = require('express');
const router = Router();

const { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante } = require('../controllers/estudiante.controllers');

router.get('/estudiante', getEstudiantes);
router.get('/estudiante/:id', getEstudiante);
router.post('/estudiante', createEstudiante);
router.put('/estudiante/:id', updateEstudiante);+
router.delete('/estudiante/:id', deleteEstudiante);

module.exports = router;