
// Import de dependenecias
const express = require('express'); //express (servidor)
const path = require('path'); //path (caminho de pastas) 
const cookieParser = require('cookie-parser');
const loginRoutes= require('./routes/loginRoutes'); 
const cargoRoutes = require('./routes/cargoRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const medidaRoutes = require('./routes/medidaRoutes');
const ingredienteRoutes = require('./routes/ingredienteRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const receitaRoutes = require('./routes/receitaRoutes');
const degustacaoRoutes = require ('./routes/degustacaoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cookieParser());


//Servidor com Express
app.use(express.json());

// Path para páginas
app.use(express.static(path.join(__dirname, '../public/assets')));
// Usar as rotas Login
app.use('/api/login', loginRoutes);

app.use('/api', dashboardRoutes);

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

// Usando o roteador de degustacao
app.use('/api/degustacao', degustacaoRoutes);



app.get('/', (req, res) => {
  // Envia o index.html da pasta 'public/pages'
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Inicializando o servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}

module.exports = app;
