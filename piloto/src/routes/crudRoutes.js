const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

// Rota para criar
router.post('/create', crudController.create);

// Rota para ler
router.get('/read', crudController.read);

// Rota para atualizar
router.put('/update', crudController.update);

// Rota para deletar
router.delete('/delete', crudController.del);

// Rota para verificar o login
router.post('/login', crudController.verificarLogin);

module.exports = router;