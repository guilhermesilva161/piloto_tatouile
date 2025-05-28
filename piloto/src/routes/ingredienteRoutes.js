const express = require('express');
const router = express.Router();
const ingredienteController = require('../controllers/ingredienteController');

// Rota para criar um novo ingrediente
router.post('/', ingredienteController.createIngrediente);

// Rota para obter todos os ingredientes
router.get('/', ingredienteController.getAllIngrediente);

// Rota para obter um ingrediente específico pelo ID
router.get('/:idIngrediente', ingredienteController.getIngredienteById);

// Rota para atualizar um ingrediente existente
router.put('/:idIngrediente', ingredienteController.updateIngrediente);

// Rota para excluir um ingrediente
router.delete('/:idIngrediente', ingredienteController.deleteIngrediente);

module.exports = router;
