const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para criar um novo categoria
router.post('/', categoriaController.createCategoria);

// Rota para obter todos os categoria
router.get('/', categoriaController.getAllCategoria);

// Rota para obter um categoria específico pelo ID
router.get('/:idCategoria', categoriaController.getCategoriaById);

// Rota para atualizar um categoriaexistente
router.put('/:idCategoria', categoriaController.updateCategoria);

// Rota para excluir um categoria
router.delete('/:idCategoria', categoriaController.deleteCategoria);

module.exports = router;