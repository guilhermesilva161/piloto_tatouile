// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { verificarToken, verificarCargo } = require('../middlewares/auth'); // Ajuste o caminho

// Rota para a página de dashboard do administrador
// Em dashboardRoutes.js

//ROTAS ADM
router.get('/dashboard-adm', verificarToken, verificarCargo(['Administrador']), (req, res) => { 
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_adm.html'));
});
router.get('/dashboard-receitas', verificarToken, verificarCargo(['Administrador']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas_adm.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-funcionarios', verificarToken, verificarCargo(['Administrador']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'funcionario.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-cargos', verificarToken, verificarCargo(['Administrador']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'cargos.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-categorias', verificarToken, verificarCargo(['Administrador']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'categoria.html')); // Ajuste o nome do arquivo se for diferente
});
router.get('/dashboard-restaurante', verificarToken, verificarCargo(['Administrador']),(req, res) => { // Pode ser sem verificarCargo se for geral para logados
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'restaurante.html')); // Ajuste o nome do arquivo se for diferente
});



// Rota chefe
router.get('/dashboard-chefe', verificarToken, verificarCargo(['Chefe']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_chefe.html'));
});
router.get('/dashboard-receitas-chefe', verificarToken, verificarCargo(['Chefe']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas.html'));
});
router.get('/dashboard-ingredientes', verificarToken, verificarCargo(['Chefe']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'ingredientes.html'));
});
router.get('/dashboard-medidas', verificarToken, verificarCargo(['Chefe']), (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'medidas.html'));
});


// Rota para a página de dashboard do degustador
router.get('/dashboard-degustador', verificarToken, verificarCargo(['Degustador']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_degustador.html'));
});

router.get('/dashboard-degustacao', verificarToken, verificarCargo(['Degustador']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'degustacao.html'));
});


//Rota para o Editor
router.get('/dashboard-editor', verificarToken, verificarCargo(['Editor']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_editor.html'));
});
router.get('/dashboard-receitas-editor', verificarToken, verificarCargo(['Editor']), (req, res) => { // Use '3' se for ID numérico, ou 'degustador' se for string
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'receitas_editor.html'));
});

// Se houver uma rota para "ver receitas" que pode ser acessada por qualquer usuário logado,
// mas que serve uma página HTML.
router.get('/dashboard-receitas', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'home_receitas.html')); // Exemplo
});

router.get('/logged-user-data', verificarToken, (req, res) => {
    // req.usuario foi populado pelo verificarToken com id, email, cargo
    if (req.usuario) {
        res.status(200).json({
            id: req.usuario.id,
            email: req.usuario.email,
            cargo: req.usuario.cargo,
            nome: req.usuario.nome || '' // Se o nome estiver no JWT
        });
    } else {
        // Isso não deveria acontecer se verificarToken passou, mas é um fallback
        res.status(401).json({ erro: 'Usuário não autenticado.' });
    }
});

module.exports = router;