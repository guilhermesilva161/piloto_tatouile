

function protegerRota(req, res, next) {
  console.log('Sessão atual:', req.session);
  if (!req.session.usuario) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado' });

  }
  next();
}

function autorizarCargo(cargoPermitido) {
  return (req, res, next) => {
    if (req.session.usuario && req.session.usuario.cargo === cargoPermitido) {
      next();
    } else {
      res.status(403).json({ mensagem: 'Acesso negado: cargo não autorizado' });
    }
  };
}

function authMiddleware(req, res, next) {
  const token = req.cookies.authToken;  // pegar cookie do token
  const cargo = req.cookies.userCargo;

  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' });
  }
  if (cargo !== 'adm') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  // opcional: aqui você pode validar o token JWT se usar
  next();
}

function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    next(); // usuário autenticado
  } else {
    res.redirect('/login'); // ou res.status(403).send('Acesso negado')
  }
}

module.exports = { protegerRota, autorizarCargo,authMiddleware,requireAuth };

