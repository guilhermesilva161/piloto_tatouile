const crudLogin = require('../services/crudLogin');

// Controlador para verificar o login
async function verificarLogin(req, res) {
  const { email, senha } = req.body;

  try {
    // Verificando o login usando o serviço de CRUD
    const usuario = await crudLogin.verificarLogin(email, senha);

    if (usuario) {

      req.session.usuario = {
        id: usuario.idUsuarios,
        email: usuario.email,
        nome: usuario.nome,
        cargo: usuario.cargo
      };
      console.log('Usuário salvo na sessão:', req.session.usuario);
      
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
