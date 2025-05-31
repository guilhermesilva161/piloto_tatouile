const pool = require('../database/conexao');

// Função de criar receita
exports.createReceita = async (req, res) => {
  const { nome_rct, dt_criacao, cozinheiro,preparo, quantidade_porcao, ind_rec_inedita, FKcategoria  } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Receita (nome_rct, dt_criacao, cozinheiro,preparo, quantidade_porcao, ind_rec_inedita, FKcategoria) VALUES (?,?,?,?,?,?,?)',
                                      [nome_rct, dt_criacao, cozinheiro, preparo, quantidade_porcao, ind_rec_inedita, FKcategoria]);
    res.status(201).json({ idReceita: result.insertId ,nome_rct, dt_criacao, cozinheiro,preparo, quantidade_porcao, ind_rec_inedita, FKcategoria });
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
    // Consulta principal: dados da receita, cozinheiro e categoria
    const receitaQuery = `
      SELECT 
        r.*, 
        f.nome AS nome_cozinheiro,
        f.nome_fantasia,
        cat.nome AS nome_categoria
      FROM Receita r
      JOIN Funcionario f ON r.cozinheiro = f.idFuncionario
      JOIN Categoria cat ON r.FKcategoria = cat.idCategoria
      WHERE r.idReceita = ?
    `;

    const [receitaRows] = await pool.query(receitaQuery, [idReceita]);

    if (receitaRows.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    const receita = receitaRows[0];

    // Converte a imagem, se existir
    if (receita.foto_func) {
      receita.fotoBase64 = receita.foto_func.toString('base64');
      delete receita.foto_func;
    }

    // Consulta dos ingredientes relacionados
    const ingredientesQuery = `
      SELECT 
        i.nome AS nome_ingrediente,
        rci.quant_ingrediente,
        m.descricao AS nome_medida
      FROM receita_contem_ingrediente rci
      JOIN Ingrediente i ON rci.FKidIngrediente = i.idIngrediente
      JOIN Medida m ON rci.FKMedida = m.idMedida
      WHERE rci.FKnome_rct = ? AND rci.FKcozinheiro = ?
    `;

    const [ingredientesRows] = await pool.query(ingredientesQuery, [
      receita.nome_rct,
      receita.cozinheiro
    ]);

    receita.ingredientes = ingredientesRows;

    res.status(200).json(receita);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a receita', error: error.message });
  }
};
// Função de atualizar uma receita por ID
exports.updateReceita = async (req, res) => {
  const { idReceita } = req.params;
  const { nome_rct, dt_criacao, preparo,cozinheiro,ind_rec_inedita,quantidade_porcao,FKcategoria} = req.body;
    if (!idReceita || isNaN(Number(idReceita))) {
    return res.status(400).json({ message: 'ID da receita inválido ou ausente.' });
  }
  try {
    const [result] = await pool.query('UPDATE Receita SET nome_rct = ?, dt_criacao = ?, preparo = ?,cozinheiro = ?, ind_rec_inedita = ?, quantidade_porcao = ?, FKcategoria = ? WHERE idReceita = ?',
                                      [ nome_rct, dt_criacao, preparo,cozinheiro,ind_rec_inedita,quantidade_porcao,FKcategoria, idReceita]);
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


exports.addIngredientes = async (req, res) => {
  const { FKnome_rct, FKcozinheiro, FKidIngrediente, FKMedida, quant_ingrediente } = req.body;

  if (!FKnome_rct || !FKcozinheiro || !FKidIngrediente) {
    return res.status(400).json({ message: 'Faltam dados obrigatórios' });
  }

  try {
    await pool.query(
      `INSERT INTO receita_contem_ingrediente 
      (FKnome_rct, FKcozinheiro, FKidIngrediente, FKMedida, quant_ingrediente)
      VALUES (?, ?, ?, ?, ?)`,
      [FKnome_rct, FKcozinheiro, FKidIngrediente, FKMedida, quant_ingrediente]
    );

    res.status(201).json({ message: 'Ingrediente adicionado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar ingrediente' });
  }
};



exports.uploadFoto = async (req, res) => {
  try {
    const { nome_rct, cozinheiro, descricao } = req.body;
    const fotoBuffer = req.file.buffer;

    await pool.query(
      `INSERT INTO Foto_Receita (FKnome_rct, FKcozinheiro, foto, descricao)
       VALUES (?, ?, ?, ?)`,
      [nome_rct, cozinheiro, fotoBuffer, descricao]
    );

    res.status(201).json({ message: 'Foto salva com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar foto' });
  }
};