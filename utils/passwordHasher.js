/**
 * Utilidades para hashear y comparar contraseñas usando bcryptjs.
 * 
 * Métodos:
 *  - hashPassword(password): Hashea una contraseña y retorna el hash.
 *  - comparePassword(inputPassword, hashedPassword): Compara una contraseña con su hash.
 * 
 * Uso:
 *   const { hashPassword, comparePassword } = require('./utils/passwordHasher');
 *   const hash = await hashPassword('miContraseña');
 *   const esValida = await comparePassword('miContraseña', hash);
 * 
 * Dependencias:
 *  - bcryptjs: Librería para hashear y comparar contraseñas.
 */

const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

// Exporta como objeto
module.exports = {
  hashPassword,
  comparePassword
};