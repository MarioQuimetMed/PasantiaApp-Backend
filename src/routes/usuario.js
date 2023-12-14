const { Router } = require('express');
const router = Router();

const { getUsuarios, createUsuario, getUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controllers');

router.get('/users', getUsuarios);
router.get('/users/:id', getUsuario);
router.post('/users', createUsuario);
router.put('/users/:id', updateUsuario);
router.delete('/users/:id', deleteUsuario);

module.exports = router;