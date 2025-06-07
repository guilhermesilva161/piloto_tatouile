const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { protegerRota, autorizarCargo } = require('../middlewares/auth');

// Login
router.post('/', loginController.verificarLogin);

// Verifica sessão e redireciona com base no cargo
router.get('/painel', protegerRota, (req, res) => {
  const { cargo } = req.session.usuario;

  let pagina;
  switch (cargo) {
    case 1: pagina = 'home_adm.html'; break;
    case 2: pagina = 'home_chefe.html'; break;
    default: return res.status(403).send('Cargo não autorizado');
  }

  res.sendFile(pagina, { root: './public/pages' });
});

module.exports = router;