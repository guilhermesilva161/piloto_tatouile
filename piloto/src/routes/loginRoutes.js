const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login
router.post('/', loginController.verificarLogin);

//Logout
router.post('/logout', (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({ mensagem: 'Logout bem-sucedido.' });
});

module.exports = router;