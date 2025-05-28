const pool = require('../database/conexao');

// Função de criar ingrediente
exports.createIngrediente = async (req, res) => {
  const { idIngrediente, nome } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Ingrediente (nome) VALUES (?)',
                                      [nome]);
    res.status(201).json({ nome });
    console.log("Ingrediente criado com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar ingrediente' });
  }
};

// Função de visualizar todos ingredientes
exports.getAllIngrediente = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ingrediente');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar ingredientes' });
  }
};

// Função de buscar ingrediente por ID
exports.getIngredienteById = async (req, res) => {
  const { idIngrediente } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Ingrediente WHERE idIngrediente = ?', [idIngrediente]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Ingrediente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o ingrediente' });
  }
};

// Função de atualizar um ingrediente por ID
exports.updateIngrediente = async (req, res) => {
  const { idIngrediente } = req.params;
  const { nome } = req.body;
  try {
    const [result] = await pool.query('UPDATE Ingrediente SET nome = ? WHERE idIngrediente = ?',
                                      [nome, idIngrediente]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Ingrediente atualizado com sucesso' });
      console.log("Ingrediente atualizado com sucesso");
    } else {
      res.status(404).json({ message: 'Ingrediente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar ingrediente' });
  }
};

// Função de deletar ingrediente
exports.deleteIngrediente = async (req, res) => {
  const { idIngrediente } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Ingrediente WHERE idIngrediente = ?', [idIngrediente]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Ingrediente excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Ingrediente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir ingrediente' });
  }
};
