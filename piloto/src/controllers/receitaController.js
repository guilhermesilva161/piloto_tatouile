const pool = require('../database/conexao');

// Função de criar receita
exports.createReceita = async (req, res) => {
  const { idReceita, nome, contato, telefone  } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Receita (nome,contato,telefone) VALUES (?,?,?)',
                                      [nome,contato,telefone]);
    res.status(201).json({ nome,contato,telefone });
    console.log("Receita criada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar receita' });
  }
};

// Função de visualizar todas as receitas
exports.getAllReceita = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Receita');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar receitas' });
  }
};

// Função de buscar receita por ID
exports.getReceitaById = async (req, res) => {
  const { idReceita } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Receita WHERE idReceita = ?', [idReceita]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a receita' });
  }
};

// Função de atualizar uma receita por ID
exports.updateReceita = async (req, res) => {
  const { idReceita } = req.params;
  const { nome,contato,telefone } = req.body;
  try {
    const [result] = await pool.query('UPDATE Receita SET nome = ?, contato = ?, telefone = ? WHERE idReceita = ?',
                                      [nome,contato,telefone, idReceita]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Receita atualizada com sucesso' });
      console.log("Receita atualizada com sucesso");
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar receita' });
  }
};

// Função de deletar receita
exports.deleteReceita = async (req, res) => {
  const { idReceita } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Receita WHERE idReceita = ?', [idReceita]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Receita excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir receita' });
  }
};
