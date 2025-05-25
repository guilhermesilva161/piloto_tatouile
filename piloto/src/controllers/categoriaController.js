const pool = require('../database/conexao');

//Função de criar categoria
exports.createCategoria = async (req, res) => {
  const {idCategoria, nome , descricao } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Categoria (nome) VALUES (?)', 
                                      [nome]);
    res.status(201).json({nome});
    console.log("Categoria criado com sucesso");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};


//Função de vizualizar todas categorias
exports.getAllCategoria = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Categoria');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
};

//Função de buscar categoria por ID
exports.getCategoriaById = async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Categoria WHERE idCategoria = ?', [idCategoria]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Categoria não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o categoria' });
  }
};

//Função de atualizar uma categoria por ID
exports.updateCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  const { nome} = req.body;
  try {
    const [result] = await pool.query('UPDATE Categoria SET nome = ? WHERE idCategoria = ?',
                                      [nome,idCategoria]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Categoria atualizada com sucesso' });
      console.log("Categoria atualizada com sucesso");
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
};

//Função de deletar categoria
exports.deleteCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Categoria WHERE idCategoria = ?', [idCategoria]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir categoria' });
  }
};