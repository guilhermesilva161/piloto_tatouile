const multer = require('multer');

// Armazenamento em memória (para salvar no banco como BLOB)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;