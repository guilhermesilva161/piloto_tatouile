const pool = require('../database/conexao'); // Importando a conexão com o banco de dados

// Criar um novo funcionário
const criarFuncionario = async (req, res) => {
  const { rg, nome, dt_admissao, salario, nome_fantasia, Cargo_idCargo } = req.body;
  const fotoBuffer = req.file ? req.file.buffer : null;

  try {
    const [result] = await pool.execute(
      'INSERT INTO Funcionario (rg, nome, dt_admissao, salario, nome_fantasia, foto_func, Cargo_idCargo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [rg, nome, dt_admissao, salario, nome_fantasia, fotoBuffer, Cargo_idCargo]
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
    const query = `
      SELECT f.*, c.descricao AS descricao_cargo
      FROM Funcionario f
      JOIN Cargo c ON f.Cargo_idCargo = c.idCargo
    `;
    const [rows] = await pool.execute(query);
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
    const query = `
      SELECT f.*, c.descricao AS descricao_cargo
      FROM Funcionario f
      JOIN Cargo c ON f.Cargo_idCargo = c.idCargo
      WHERE f.idFuncionario = ?
    `;
    const [rows] = await pool.execute(query, [idFuncionario]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    const funcionario = rows[0];

    if (funcionario.foto_func) {
      funcionario.fotoBase64 = funcionario.foto_func.toString('base64');
      delete funcionario.foto_func; // opcional, para não enviar buffer cru
    }

    res.status(200).json(funcionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar funcionário', error: error.message });
  }
};

// Atualizar um funcionário
const atualizarFuncionario = async (req, res) => {
  const { idFuncionario } = req.params;
  const { rg, nome, dt_admissao, salario, nome_fantasia, Cargo_idCargo } = req.body;

  const salarioNum = parseFloat(salario);
  const cargoIdNum = parseInt(Cargo_idCargo, 10);
  const fotoBuffer = req.file ? req.file.buffer : null;

  try {
    const query = `
      UPDATE Funcionario SET 
        rg = ?, 
        nome = ?, 
        dt_admissao = ?, 
        salario = ?, 
        nome_fantasia = ?, 
        ${fotoBuffer ? 'foto_func = ?, ' : ''} 
        Cargo_idCargo = ? 
      WHERE idFuncionario = ?
    `;

    const params = fotoBuffer
      ? [rg, nome, dt_admissao, salarioNum, nome_fantasia, fotoBuffer, cargoIdNum, idFuncionario]
      : [rg, nome, dt_admissao, salarioNum, nome_fantasia, cargoIdNum, idFuncionario];

    const [result] = await pool.execute(query, params);

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