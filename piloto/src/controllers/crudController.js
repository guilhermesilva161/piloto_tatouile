const conexao = require('../database/conexao');
const crudService = require('../services/crudService');

// Controlador para criar
async function create(req, res) {
  const { table, data } = req.body;
  try {
    const result = await crudService.create(table, data);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar registro' });
  }
}

// Controlador para ler
async function read(req, res) {
  const { table } = req.query;
  try {
    const result = await crudService.read(table);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar registros' });
  }
}

// Controlador para atualizar
async function update(req, res) {
  const { table, id, data } = req.body;
  try {
    const result = await crudService.update(table, id, data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar registro' });
  }
}

// Controlador para deletar
async function del(req, res) {
  const { table, id } = req.body;
  try {
    const result = await crudService.del(table, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar registro' });
  }
}

// Controlador para verificar o login
async function verificarLogin(req, res) {
  const { email, senha } = req.body;

  try {
    // Verificando o login usando o serviço de CRUD
    const usuario = await crudService.verificarLogin(email, senha);

    if (usuario) {
      res.status(200).json({
        mensagem: 'Login bem-sucedido',
        usuario: {
          nome: usuario.nome,
          cargo: usuario.cargo
        }
      });
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    res.status(500).json({ erro: 'Erro ao verificar login', detalhes: error.message });
  }
}

module.exports = {
  create,
  read,
  update,
  del,
  verificarLogin
};
