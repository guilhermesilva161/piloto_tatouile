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
    const [rows] = await pool.query(`
      SELECT 
        r.*, 
        f.nome AS cozinheiro,
        f.idFuncionario AS FKcozinheiro,
        f.nome_fantasia,
        cat.nome AS nome_categoria,
        deg.nota_degustacao AS nota,
        deg.comentario AS coment,
        deg.idDegustacao as idDeg,
        TO_BASE64(fr.foto) AS fotoBase64
      FROM Receita r
      JOIN Funcionario f ON r.cozinheiro = f.idFuncionario
      JOIN Categoria cat ON r.FKcategoria = cat.idCategoria
      LEFT JOIN Foto_Receita fr ON fr.FKidReceita = r.idReceita
      LEFT JOIN Degustacao deg 
        ON deg.FKnome_rct = r.nome_rct AND deg.FKcozinheiro = r.cozinheiro
    `);
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
        f.nome AS cozinheiro,
        fd.nome AS degustador,
        f.idFuncionario AS FKcozinheiro,
        f.nome_fantasia,
        cat.nome AS nome_categoria,
        deg.nota_degustacao as nota,
        deg.comentario AS coment,
        deg.data_degustacao AS data_deg,
        TO_BASE64(fr.foto) AS fotoBase64
      FROM Receita r
      JOIN Funcionario f ON r.cozinheiro = f.idFuncionario
      JOIN Categoria cat ON r.FKcategoria = cat.idCategoria
      LEFT JOIN Foto_Receita fr ON fr.FKidReceita = r.idReceita
      LEFT JOIN Degustacao deg ON deg.FKnome_rct = r.nome_rct AND deg.FKcozinheiro = r.cozinheiro
      LEFT JOIN Funcionario fd ON deg.FKdegustador = fd.idFuncionario
      WHERE r.idReceita = ?
    `;

    const [receitaRows] = await pool.query(receitaQuery, [idReceita]);

    if (receitaRows.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    const receita = receitaRows[0];

    // Converte a imagem, se existir (ajuste o campo conforme seu banco)
    if (receita.foto_func) {
      receita.fotoBase64 = receita.foto_func.toString('base64');
      delete receita.foto_func;
    }

    // Consulta dos ingredientes relacionados
    const ingredientesQuery = `
SELECT 
  i.idIngrediente,
  i.nome AS nome_ingrediente,
  rci.quant_ingrediente,
  m.idMedida,
  m.descricao AS nome_medida,
  rci.FKidReceita
FROM receita_contem_ingrediente rci
JOIN Ingrediente i ON rci.FKidIngrediente = i.idIngrediente
JOIN Medida m ON rci.FKMedida = m.idMedida
WHERE rci.FKidReceita = ?

    `;

    const [ingredientesRows] = await pool.query(ingredientesQuery, [idReceita]);

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

exports.updateIngredientesDaReceita = async (req, res) => {
  const { idReceita } = req.params;
  const novosIngredientes = req.body.ingredientes;

  if (!Array.isArray(novosIngredientes)) {
    return res.status(400).json({ message: 'Dados de ingredientes inválidos' });
  }

  try {
    // 1. Buscar ingredientes atuais no banco
    const [ingredientesAtuais] = await pool.query(
      `SELECT FKidIngrediente, FKMedida, quant_ingrediente 
       FROM receita_contem_ingrediente 
       WHERE FKidReceita = ?`, 
      [idReceita]
    );

    const ingredientesMap = new Map();
    ingredientesAtuais.forEach(ing => {
      ingredientesMap.set(ing.FKidIngrediente, ing);
    });

    // 2. Atualizar ou inserir novos
    for (const novo of novosIngredientes) {
      const existente = ingredientesMap.get(novo.FKidIngrediente);

      if (existente) {
        if (
          existente.quant_ingrediente !== novo.quant_ingrediente ||
          existente.FKMedida !== novo.FKMedida
        ) {
          await pool.query(
            `UPDATE receita_contem_ingrediente 
             SET quant_ingrediente = ?, FKMedida = ? 
             WHERE FKidReceita = ? AND FKidIngrediente = ?`,
            [novo.quant_ingrediente, novo.FKMedida, idReceita, novo.FKidIngrediente]
          );
        }

        ingredientesMap.delete(novo.FKidIngrediente);
      } else {
        // Novo ingrediente
        await pool.query(
          `INSERT INTO receita_contem_ingrediente 
           (FKidReceita, FKidIngrediente, FKMedida, quant_ingrediente)
           VALUES (?, ?, ?, ?)`,
          [idReceita, novo.FKidIngrediente, novo.FKMedida, novo.quant_ingrediente]
        );
      }
    }

    // 3. Ingredientes removidos
    for (const [idIngrediente] of ingredientesMap) {
      await pool.query(
        `DELETE FROM receita_contem_ingrediente 
         WHERE FKidReceita = ? AND FKidIngrediente = ?`,
        [idReceita, idIngrediente]
      );
    }

    res.status(200).json({ message: 'Ingredientes atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar ingredientes:', error);
    res.status(500).json({ message: 'Erro ao atualizar ingredientes', error: error.message });
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
  const { idReceita } = req.params;
  const { FKidIngrediente, FKMedida, quant_ingrediente } = req.body;

  if (!idReceita || !FKidIngrediente) {
    return res.status(400).json({ message: 'Faltam dados obrigatórios' });
  }

  try {
    await pool.query(
      `INSERT INTO receita_contem_ingrediente 
      (FKidReceita, FKidIngrediente, FKMedida, quant_ingrediente)
      VALUES (?, ?, ?, ?)`,
      [idReceita, FKidIngrediente, FKMedida, quant_ingrediente]
    );

    res.status(201).json({ message: 'Ingrediente adicionado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar ingrediente' });
  }
};



exports.uploadFoto = async (req, res) => {
  const { idReceita } = req.params;
  const { descricao } = req.body;

  // Verifica se foi enviado um arquivo
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhuma foto enviada.' });
  }

  const fotoBuffer = req.file.buffer;

  try {
    // Verifica se a receita existe
    const [receita] = await pool.query('SELECT * FROM Receita WHERE idReceita = ?', [idReceita]);

    if (receita.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada.' });
    }

    // Insere a foto vinculada à receita
    await pool.query(
      `INSERT INTO Foto_Receita (FKidReceita, foto, descricao)
       VALUES (?, ?, ?)`,
      [idReceita, fotoBuffer, descricao]
    );

    res.status(201).json({ message: 'Foto da receita salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar a foto da receita:', error);
    res.status(500).json({ message: 'Erro ao salvar foto', error: error.message });
  }
};

