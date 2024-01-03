const { Router } = require('express');
const router = Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { subirPdf } = require('../controllers/file.controllers');

router.post('/file',upload.single('file'), subirPdf);

module.exports = router;