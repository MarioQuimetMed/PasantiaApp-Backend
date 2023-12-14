const { Router } = require('express');
const router = Router();

const { login} = require('../controllers/auth.contoller');

router.post('/login', login);

module.exports = router;