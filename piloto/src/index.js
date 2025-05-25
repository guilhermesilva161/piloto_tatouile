
// Import de dependenecias
const express = require('express'); //express (servidor)
const path = require('path'); //path (caminho de pastas) 
const loginRoutes= require('./routes/loginRoutes'); 
const cargoRoutes = require('./routes/cargoRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();


//Servidor com Express

app.use(express.json());  // Middleware para lidar com JSON no corpo das requisições


// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Usar as rotas Login
app.use('/api/login', loginRoutes);

// Usando o roteador de Cargo
app.use('/api/cargos', cargoRoutes);

// Usando o roteador de Funcionarios
app.use('/api/funcionarios', funcionarioRoutes);

// Usando o roteador de Categorias
app.use('/api/categoria', categoriaRoutes);


app.get('/', (req, res) => {
  // Envia o index.html da pasta 'public/pages'
  res.sendFile(path.join(__dirname, '../public/pages', 'index.html'));
});

// Inicializando o servidor
app.listen(3000, () =>{
    console.log("O servidor está online, Tela login exibida");
});