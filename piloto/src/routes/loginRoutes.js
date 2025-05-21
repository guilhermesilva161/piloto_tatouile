const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota para verificar o login
router.post('/', loginController.verificarLogin);

module.exports = router;