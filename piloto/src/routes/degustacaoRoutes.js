const express = require('express');
const router = express.Router();
const degustacaoController = require('../controllers/degustacaoController');

// POST /degustacoes
router.post('/', degustacaoController.salvarDegustacao);

router.get('/', degustacaoController.getAllDegustacao);

// Rota para obter uma degustacaoespecífico pelo ID
router.get('/:idDegustacao', degustacaoController.getDegustacaoById);

module.exports = router;
