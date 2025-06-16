// middlewares/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'security_key';

function verificarToken(req, res, next) {
    // Busca o token do cookie (req.cookies.jwt)
    const token = req.cookies.jwt;

    if (!token) {
        // Se o token não for fornecido, redireciona para a página de login
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; // Adiciona as informações do usuário à requisição
        next(); // Continua
    } catch (error) {
        // Se o token for inválido/expirado, redireciona e limpa o cookie (opcional)
        res.clearCookie('jwt'); // Limpa o cookie inválido
        return res.redirect('/');
    }
}

function verificarCargo(cargosPermitidos) {
    return (req, res, next) => {
        if (!req.usuario || !req.usuario.cargo) {
            res.clearCookie('jwt'); // Limpa o cookie se houver inconsistência
            return res.redirect('/');
        }
        const userCargo = String(req.usuario.cargo);
        if (cargosPermitidos.includes(userCargo)) {
            next();
        } else {
            res.clearCookie('jwt'); // Limpa o cookie se o cargo for inválido
            return res.redirect('/');
        }
    };
}

module.exports = {
    verificarToken,
    verificarCargo
};