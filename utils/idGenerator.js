const { v4: uuidv4 } = require('uuid');

// Versión más simple usando UUID directamente en los modelos
module.exports = () => uuidv4();