const express = require('express');
const router = express.Router();
const medidaController = require('../controllers/medidaController');

// Rota para criar uma nova medida
router.post('/', medidaController.createMedida);

// Rota para obter todas as medidas
router.get('/', medidaController.getAllMedida);

// Rota para obter uma medida específica pelo ID
router.get('/:idMedida', medidaController.getMedidaById);

// Rota para atualizar uma medida existente
router.put('/:idMedida', medidaController.updateMedida);

// Rota para excluir uma medida
router.delete('/:idMedida', medidaController.deleteMedida);

module.exports = router;
