const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

// Rota para criar uma nova restaurante
router.post('/', restauranteController.createRestaurante);

// Rota para obter todas as restaurantes
router.get('/', restauranteController.getAllRestaurante);

// Rota para obter uma restaurante específica pelo ID
router.get('/:idRestaurante', restauranteController.getRestauranteById);

// Rota para atualizar uma restaurante existente
router.put('/:idRestaurante', restauranteController.updateRestaurante);

// Rota para excluir uma restaurante
router.delete('/:idRestaurante', restauranteController.deleteRestaurante);

module.exports = router;
