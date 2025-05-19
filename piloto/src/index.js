
// Import de dependenecias
const express = require('express'); //express (servidor)
const path = require('path'); //path (caminho de pastas) 
const mysql = require('mysql2'); //mysql (banco)
const bodyParser = require('body-parser');
const crudRoutes = require('./routes/crudRoutes'); 

const app = express();


//Servidor com Express

app.use(express.json());  // Middleware para lidar com JSON no corpo das requisições

// Usar as rotas CRUD
app.use('/api/crud', crudRoutes);

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  // Envia o index.html da pasta 'public/pages'
  res.sendFile(path.join(__dirname, '../public/pages', 'index.html'));
});

// Inicializando o servidor
app.listen(3000, () =>{
    console.log("O servidor está online, Tela login exibida");
});