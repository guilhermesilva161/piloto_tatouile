const pool = require('../database/conexao'); // Importando a conexão com o banco de dados

exports.salvarDegustacao = async (req, res) => {
  const {
    nota_degustacao,
    data_degustacao,
    FKnome_rct,
    FKcozinheiro,
    FKdegustador,
    comentario
  } = req.body;
    const sql = `
      INSERT INTO Degustacao 
      (nota_degustacao, data_degustacao, FKnome_rct, FKcozinheiro, FKdegustador, comentario)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

      const [result] = await pool.query(sql, [
        nota_degustacao,
        data_degustacao,
        FKnome_rct,
        FKcozinheiro,
        FKdegustador,
        comentario
    ]);

    return res.status(201).json({id: result.insertId, mensagem: 'Avaliação salva com sucesso!' });
  }


exports.getAllDegustacao = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Degustacao');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar degustacao' });
  }
};

exports.getDegustacaoById = async (req, res) => {
  const { idDegustacao } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Degustacao WHERE idDegustacao = ?', [idDegustacao]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Degustacao não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar degutascao' });
  }
};


exports.deletarDegustacao = async (req, res) => {
  const { idDegustacao } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM Degustacao WHERE idDegustacao = ?', [idDegustacao]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Degustacação não encontrada' });
    }

    res.status(200).json({ message: 'Degustacação deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar degustacação', error: error.message });
  }
};


exports.updateDegustacao = async (req, res) => {
  const { idDegustacao } = req.params;
  const { nota_degustacao, data_degustacao, comentario,FKnome_rct,FKcozinheiro,FKdegustador } = req.body;
  try {
    const [result] = await pool.query('UPDATE Degustacao SET nota_degustacao = ?, data_degustacao = ?, comentario = ?, FKnome_rct = ?, FKcozinheiro = ?, FKdegustador= ? WHERE idDegustacao = ?',
                                      [nota_degustacao, data_degustacao, comentario,FKnome_rct,FKcozinheiro,FKdegustador, idDegustacao]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Degustação atualizado com sucesso' });
      console.log("Degustacao atualizado com sucesso");
    } else {
      res.status(404).json({ message: 'Degustação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar degustação' });
  }
};
