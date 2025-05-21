const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Definir as rotas para o CRUD de Funcionario
router.post('/', funcionarioController.criarFuncionario); // Criar um novo funcionário
router.get('/', funcionarioController.listarFuncionarios); // Listar todos os funcionários
router.get('/:idFuncionario', funcionarioController.buscarFuncionario); // Buscar um funcionário pelo ID
router.put('/:idFuncionario', funcionarioController.atualizarFuncionario); // Atualizar um funcionário
router.delete('/:idFuncionario', funcionarioController.deletarFuncionario); // Deletar um funcionário

module.exports = router;