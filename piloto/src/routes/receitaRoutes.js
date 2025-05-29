const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// Rota para criar uma nova receita
router.post('/', receitaController.createReceita);

// Rota para obter todas as receitas
router.get('/', receitaController.getAllReceita);

// Rota para obter uma receita específica pelo ID
router.get('/:idReceita', receitaController.getReceitaById);

// Rota para atualizar uma receita existente
router.put('/:idReceita', receitaController.updateReceita);

// Rota para excluir uma receita
router.delete('/:idReceita', receitaController.deleteReceita);

module.exports = router;
