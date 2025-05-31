const multer = require('multer');

const storage = multer.memoryStorage(); // salvar em memória, para enviar direto para DB
const uploadReceita = multer({ storage });

module.exports = uploadReceita;