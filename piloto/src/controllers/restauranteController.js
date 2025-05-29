const pool = require('../database/conexao');

// Função de criar restaurante
exports.createRestaurante = async (req, res) => {
  const { idRestaurante, nome, contato, telefone  } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Restaurante (nome,contato,telefone) VALUES (?,?,?)',
                                      [nome,contato,telefone]);
    res.status(201).json({ nome,contato,telefone });
    console.log("Restaurante criada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar restaurante' });
  }
};

// Função de visualizar todas as restaurantes
exports.getAllRestaurante = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Restaurante');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar restaurantes' });
  }
};

// Função de buscar restaurante por ID
exports.getRestauranteById = async (req, res) => {
  const { idRestaurante } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Restaurante WHERE idRestaurante = ?', [idRestaurante]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Restaurante não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a restaurante' });
  }
};

// Função de atualizar uma restaurante por ID
exports.updateRestaurante = async (req, res) => {
  const { idRestaurante } = req.params;
  const { nome,contato,telefone } = req.body;
  try {
    const [result] = await pool.query('UPDATE Restaurante SET nome = ?, contato = ?, telefone = ? WHERE idRestaurante = ?',
                                      [nome,contato,telefone, idRestaurante]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Restaurante atualizada com sucesso' });
      console.log("Restaurante atualizada com sucesso");
    } else {
      res.status(404).json({ message: 'Restaurante não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar restaurante' });
  }
};

// Função de deletar restaurante
exports.deleteRestaurante = async (req, res) => {
  const { idRestaurante } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Restaurante WHERE idRestaurante = ?', [idRestaurante]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Restaurante excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Restaurante não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir restaurante' });
  }
};
