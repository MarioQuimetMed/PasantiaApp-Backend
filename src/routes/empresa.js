const { Router } = require('express');
const router = Router();

const { getEmpresas, getEmpresa, createEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresa.controlles');

router.get('/empresa', getEmpresas);
router.get('/empresa/:id', getEmpresa);
router.post('/empresa', createEmpresa);
router.put('/empresa/:id', updateEmpresa);
router.delete('/empresa/:id', deleteEmpresa);

module.exports = router;