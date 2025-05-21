const pool = require('../database/conexao'); // Importando a conexão com o banco de dados

// Criar um novo funcionário
const criarFuncionario = async (req, res) => {
  const { rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO Funcionario (rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo]
    );
    res.status(201).json({ message: 'Funcionário criado com sucesso', idFuncionario: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar funcionário', error: error.message });
  }
};

// Listar todos os funcionários
const listarFuncionarios = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Funcionario');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar funcionários', error: error.message });
  }
};

// Buscar um funcionário específico
const buscarFuncionario = async (req, res) => {
  const { idFuncionario } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Funcionario WHERE idFuncionario = ?', [idFuncionario]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar funcionário', error: error.message });
  }
};

// Atualizar um funcionário
const atualizarFuncionario = async (req, res) => {
  const { idFuncionario } = req.params;
  const { rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo } = req.body;
  

  try {
    const [result] = await pool.execute(
      'UPDATE Funcionario SET rg = ?, nome = ?, dt_admissao = ?, salario = ?, nome_fantasia = ?, foto_func = ?, Cargo_idCargo = ? WHERE idFuncionario = ?',
      [rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo, idFuncionario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error: error.message });
    console.log('Dados recebidos:', req.body);
  }
};

// Deletar um funcionário
const deletarFuncionario = async (req, res) => {
  const { idFuncionario } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM Funcionario WHERE idFuncionario = ?', [idFuncionario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar funcionário', error: error.message });
  }
};

module.exports = {
  criarFuncionario,
  listarFuncionarios,
  buscarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
};