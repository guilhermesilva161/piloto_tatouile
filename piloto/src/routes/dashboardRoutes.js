// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { verificarToken, verificarCargo } = require('../middlewares/auth'); // Ajuste o caminho

// Rota para a página de dashboard do administrador
// Em dashboardRoutes.js

//ROTAS ADM
router.get('/dashboard-adm', verificarToken, verificarCargo(['1']), (req, res) => { 
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_adm.html'));
});
router.get('/dashboard-receitas', verificarToken, verificarCargo(['1']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas_adm.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-funcionarios', verificarToken, verificarCargo(['1']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'funcionario.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-cargos', verificarToken, verificarCargo(['1']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'cargos.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-categorias', verificarToken, verificarCargo(['1']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'categoria.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-restaurante', verificarToken, verificarCargo(['1']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'restaurante.html')); // Ajuste o nome do arquivo se for diferente
});



// Rota chefe
router.get('/dashboard-chefe', verificarToken, verificarCargo(['2']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_chefe.html'));
});
router.get('/dashboard-receitas-chefe', verificarToken, verificarCargo(['2']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas.html'));
});
router.get('/dashboard-ingredientes', verificarToken, verificarCargo(['2']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'ingredientes.html'));
});
router.get('/dashboard-medidas', verificarToken, verificarCargo(['2']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'medidas.html'));
});


// Rota para a página de dashboard do degustador
router.get('/dashboard-degustador', verificarToken, verificarCargo(['4']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_degustador.html'));
});

router.get('/dashboard-degustacao', verificarToken, verificarCargo(['4']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'degustacao.html'));
});


//Rota para o Editor
router.get('/dashboard-editor', verificarToken, verificarCargo(['6']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_editor.html'));
});
router.get('/dashboard-receitas-editor', verificarToken, verificarCargo(['6']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas_editor.html'));
});

// Se houver uma rota para "ver receitas" que pode ser acessada por qualquer usuário logado,
// mas que serve uma página HTML.
router.get('/dashboard-receitas', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_receitas.html')); // Exemplo
});


module.exports = router;