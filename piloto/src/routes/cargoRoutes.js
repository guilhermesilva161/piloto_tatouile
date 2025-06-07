const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const {authMiddleware} = require('../middlewares/auth');

// Rota para criar um novo cargo
router.post('/', cargoController.createCargo);

// Rota para obter todos os cargos
router.get('/', cargoController.getAllCargos);

// Rota para obter um cargo específico pelo ID
router.get('/:idCargo', cargoController.getCargoById);

// Rota para atualizar um cargo existente
router.put('/:idCargo', cargoController.updateCargo);

// Rota para excluir um cargo
router.delete('/:idCargo', cargoController.deleteCargo);

module.exports = router;