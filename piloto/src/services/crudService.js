const crudModel = require('../models/crudModel');

// Serviço para criar
async function create(table, data) {
  const result = await crudModel.create(table, data);
  return result;
}

// Serviço para ler
async function read(table) {
  const result = await crudModel.read(table);
  return result;
}

// Serviço para atualizar
async function update(table, id, data) {
  const result = await crudModel.update(table, id, data);
  return result;
}

// Serviço para deletar
async function del(table, id) {
  const result = await crudModel.del(table, id);
  return result;
}


///Verificar Login
const db = require('../database/conexao');

async function verificarLogin(email, senha) {
  try {
    console.log(`Verificando login para: ${email}`);
    const query = `
      SELECT u.idUsuarios, u.email, u.senha, f.nome, c.descricao AS cargo
      FROM Usuarios u
      JOIN Funcionario f ON u.FKfuncionario = f.idFuncionario
      JOIN Cargo c ON f.Cargo_idCargo = c.idCargo
      WHERE u.email = ? AND u.senha = ?
    `;
    const [rows] = await db.execute(query, [email, senha]);

    if (rows.length > 0) {
      console.log('Usuário encontrado:', rows[0]);
      return rows[0];
    } else {
      console.log('Usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Erro no serviço de login:', error);
    throw error;
  }
}

module.exports = {
  create,
  read,
  update,
  del,
  verificarLogin
};

