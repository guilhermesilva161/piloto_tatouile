const db = require('../database/conexao');

// Função para criar um registro
async function create(table, data) {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  const [result] = await db.execute(sql, values);
  return { id: result.insertId, ...data };
}

// Função para ler dados
async function read(table) {
  const sql = `SELECT * FROM ${table}`;
  const [rows] = await db.execute(sql);
  return rows;
}

// Função para atualizar um registro
async function update(table, id, data) {
  const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = Object.values(data);
  const sql = `UPDATE ${table} SET ${columns} WHERE id = ?`;

  await db.execute(sql, [...values, id]);
  return { id, ...data };
}

// Função para deletar um registro
async function del(table, id) {
  const sql = `DELETE FROM ${table} WHERE id = ?`;

  await db.execute(sql, [id]);
  return { message: 'Deletado com sucesso' };
}

module.exports = {
  create,
  read,
  update,
  del
};

