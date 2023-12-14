const { Router } = require('express');
const router = Router();

const { getRoles, getRol, createRol, updateRol, deleteRol } = require('../controllers/rol.controllers');

router.get('/rol', getRoles);
router.get('/rol/:id', getRol);
router.post('/rol', createRol);
router.put('/rol/:id', updateRol);
router.delete('/rol/:id', deleteRol);

module.exports = router;