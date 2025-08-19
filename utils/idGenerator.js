/**
 * Generador de IDs únicos.
 * Utiliza la librería 'uuid' para crear identificadores universales únicos (UUID v4).
 * 
 * Uso:
 *   const generateId = require('./utils/idGenerator');
 *   const id = generateId(); // Retorna un string UUID v4
 * 
 * Dependencias:
 *  - uuid: Librería para generar UUIDs.
 */
const { v4: uuidv4 } = require('uuid');

module.exports = () => uuidv4();