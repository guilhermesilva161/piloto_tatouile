const pool = require('../database/conexao');

// Função de criar medida
exports.createMedida = async (req, res) => {
  const { idMedida, descricao } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Medida (descricao) VALUES (?)',
                                      [descricao]);
    res.status(201).json({ descricao });
    console.log("Medida criada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar medida' });
  }
};

// Função de visualizar todas as medidas
exports.getAllMedida = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Medida');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar medidas' });
  }
};

// Função de buscar medida por ID
exports.getMedidaById = async (req, res) => {
  const { idMedida } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Medida WHERE idMedida = ?', [idMedida]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Medida não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a medida' });
  }
};

// Função de atualizar uma medida por ID
exports.updateMedida = async (req, res) => {
  const { idMedida } = req.params;
  const { descricao } = req.body;
  try {
    const [result] = await pool.query('UPDATE Medida SET descricao = ? WHERE idMedida = ?',
                                      [descricao, idMedida]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Medida atualizada com sucesso' });
      console.log("Medida atualizada com sucesso");
    } else {
      res.status(404).json({ message: 'Medida não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar medida' });
  }
};

// Função de deletar medida
exports.deleteMedida = async (req, res) => {
  const { idMedida } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Medida WHERE idMedida = ?', [idMedida]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Medida excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Medida não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir medida' });
  }
};
