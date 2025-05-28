const pool = require('../database/conexao'); // Importando a pool de conexão

// Função para criar um novo cargo
exports.createCargo = async (req, res) => {
  const {descricao, data_inicio, data_fim, ind_ativo } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Cargo (descricao, data_inicio, data_fim, ind_ativo) VALUES (?, ?, ?, ?)', 
                                      [descricao, data_inicio, data_fim, ind_ativo]);
    res.status(201).json({ idCargo: result.insertId, descricao, data_inicio, data_fim, ind_ativo });
    console.log("Cargo criado com sucesso");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar cargo' });
  }
};

// Função para obter todos os cargos
exports.getAllCargos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Cargo');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar cargos' });
  }
};

// Função para obter um cargo pelo ID
exports.getCargoById = async (req, res) => {
  const { idCargo } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Cargo WHERE idCargo = ?', [idCargo]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o cargo' });
  }
};

// Função para atualizar um cargo
exports.updateCargo = async (req, res) => {
  const { idCargo } = req.params;
  const { descricao, data_inicio, data_fim, ind_ativo } = req.body;
  try {
    const [result] = await pool.query('UPDATE Cargo SET descricao = ?, data_inicio = ?, data_fim = ?, ind_ativo = ? WHERE idCargo = ?',
                                      [descricao, data_inicio, data_fim, ind_ativo, idCargo]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Cargo atualizado com sucesso' });
      console.log("Cargo atualizado com sucesso");
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar cargo' });
  }
};

// Função para excluir um cargo
exports.deleteCargo = async (req, res) => {
  const { idCargo } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Cargo WHERE idCargo = ?', [idCargo]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Cargo excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
      alert("Não é possivel excluir um cargo que possui funcionários!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir cargo' });
    
  }
};