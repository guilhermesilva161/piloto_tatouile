const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');
const upload = require('../middlewares/uploadReceita');

// Rota para criar uma nova receita (sem foto, só dados JSON)
router.post('/', receitaController.createReceita);

// Rota para adicionar ingredientes a uma receita (exemplo, adapte se tiver)
router.post('/:idReceita/ingrediente', receitaController.addIngredientes); // se criar essa função no controller

// Rota para fazer upload da foto da receita (com multer)
router.post('/:idReceita/foto', upload.single('foto'), receitaController.uploadFoto);

// Rota para obter todas as receitas
router.get('/', receitaController.getAllReceita);

// Rota para obter uma receita específica pelo ID
router.get('/:idReceita', receitaController.getReceitaById);

// Rota para atualizar uma receita existente (sem foto)
router.put('/:idReceita', receitaController.updateReceita);

// Rota para atualizar uma receita existente (sem foto)
router.put('/:idReceita/ingredientes/', receitaController.updateIngredientesDaReceita);

// Rota para excluir uma receita
router.delete('/:idReceita', receitaController.deleteReceita);
module.exports = router;