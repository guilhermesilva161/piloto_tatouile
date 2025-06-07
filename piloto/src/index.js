
// Import de dependenecias
const express = require('express'); //express (servidor)
const session = require('express-session'); //Proteção
const cookieParser = require('cookie-parser'); //cookie
const path = require('path'); //path (caminho de pastas) 
const loginRoutes= require('./routes/loginRoutes'); 
const cargoRoutes = require('./routes/cargoRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const medidaRoutes = require('./routes/medidaRoutes');
const ingredienteRoutes = require('./routes/ingredienteRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const receitaRoutes = require('./routes/receitaRoutes');
const {authMiddleware, requireAuth} = require('./middlewares/auth');

const app = express();


//Servidor com Express

app.use(express.json());  // Middleware para lidar com JSON no corpo das requisições
app.use(cookieParser()); // Para o Express ler o cookie
app.use(session({
  secret: 'chave_secret', // ideal usar variável de ambiente
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // sessão dura 1 hora
}));


// Path para páginas
app.use(express.static(path.join(__dirname, '../public')));

// Usar as rotas Login
app.use('/api/login', loginRoutes);

// Usando o roteador de Cargo
app.use('/api/cargos', cargoRoutes);

// Usando o roteador de Funcionarios
app.use('/api/funcionarios', funcionarioRoutes);

// Usando o roteador de Categorias
app.use('/api/categoria', categoriaRoutes);

// Usar as rotas ingredientes'
app.use('/api/ingrediente', ingredienteRoutes);

// Usando o roteador de medidas
app.use('/api/medida', medidaRoutes);

// Usando o roteador de restaurante
app.use('/api/restaurante', restauranteRoutes);

// Usando o roteador de receitas
app.use('/api/receita', receitaRoutes);


app.get('/api/receita', authMiddleware, (req, res) => {
  res.json({ dados: 'dados sensíveis do ADM' });
});

app.get('/', (req, res) => {
  // Envia o index.html da pasta 'public/pages'
  res.sendFile(path.join(__dirname, '../public/pages', 'index.html'));
});

// Inicializando o servidor
app.listen(3000, () =>{
    console.log("O servidor está online, Tela login exibida");
});