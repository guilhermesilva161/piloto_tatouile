// controllers/loginController.js
const crudLogin = require('../services/crudLogin');
const jwt = require('jsonwebtoken');

// IMPORTANTE: Esta chave está hardcoded. Mudar para variável de ambiente futuramente.
const JWT_SECRET = 'security_key';

async function verificarLogin(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await crudLogin.verificarLogin(email, senha);

        if (usuario) {
            const token = jwt.sign(
                {
                    id: usuario.idFuncionario,
                    email: usuario.email,
                    cargo: usuario.cargo,
                    nome: usuario.nome
                },
                JWT_SECRET,
                { expiresIn: '1h' } // Token expira em 1 hora
            );

            // <-- AQUI ESTÁ A MUDANÇA PRINCIPAL -->
            // Define o JWT como um cookie HttpOnly
            res.cookie('jwt', token, {
                httpOnly: true, // O cookie não pode ser acessado via JavaScript no navegador
                secure: process.env.NODE_ENV === 'production', // Use 'true' apenas em produção com HTTPS
                sameSite: 'strict', // Proteção CSRF: 'strict' ou 'Lax'
                maxAge: 3600000 // Duração do cookie em milissegundos (1 hora)
            });

            // Responda ao frontend, mas agora o token já está no cookie
            res.status(200).json({
                mensagem: 'Login bem-sucedido',
                usuario: {
                    nome: usuario.nome,
                    cargo: usuario.cargo
                }
            });
        } else {
            res.status(401).json({ erro: 'Email ou senha inválidos' });
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        res.status(500).json({ erro: 'Erro ao verificar login', detalhes: error.message });
    }
}

module.exports = {
    verificarLogin
};