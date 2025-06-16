// services/crudLogin.js
const db = require('../database/conexao');

async function verificarLogin(email, senha) {
    try {
        console.log(`Verificando login para: ${email}`);
        const query = `
            SELECT u.idUsuarios, u.email, u.senha, f.nome,f.idFuncionario, c.descricao AS cargo
            FROM Usuarios u
            JOIN Funcionario f ON u.FKfuncionario = f.idFuncionario
            JOIN Cargo c ON f.Cargo_idCargo = c.idCargo
            WHERE u.email = ? AND u.senha = ?
        `;
        const [rows] = await db.execute(query, [email, senha]);

        if (rows.length > 0) {
            console.log('Usuário encontrado:', rows[0]);
            return rows[0];
        } else {
            console.log('Email ou senha inválidos.');
            return null;
        }
    } catch (error) {
        console.error('Erro no serviço de login:', error);
        throw error;
    }
}

module.exports = {
    verificarLogin
};