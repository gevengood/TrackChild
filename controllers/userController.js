const data = require('../data-dummy/data.json');
const MainFactory = require('./mainFactory');
const mainFactory = new MainFactory();
const userFactory = mainFactory.getUserFactory();

// Obtener todos los usuarios
const getAllUsers = () => {
  return data.users;
};

// Crear un nuevo usuario
const createUser = (userData) => {
  if (!userData) {
    return { message: "No se proporcionaron datos de usuario", error: true };
  }
  
  try {
    const newUser = userFactory.createUser(userData);
    data.users.push(newUser);
    return { message: "Usuario creado", error: false, user: newUser };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Obtener usuario por ID
const getUserById = (userId) => {
  const user = data.users.find(u => u.userId === userId);
  if (!user) {
    return { message: "Usuario no encontrado", error: true };
  }
  return { message: "Usuario encontrado", error: false, user };
};

// Actualizar usuario
const updateUser = (userId, userData) => {
  const userIndex = data.users.findIndex(u => u.userId === userId);
  if (userIndex === -1) {
    return { message: "Usuario no encontrado", error: true };
  }
  
  try {
    const updatedUser = userFactory.updateUser(userId, userData);
    data.users[userIndex] = updatedUser;
    return { message: "Usuario actualizado", error: false, user: updatedUser };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Eliminar usuario
const deleteUser = (userId) => {
  const userIndex = data.users.findIndex(u => u.userId === userId);
  if (userIndex === -1) {
    return { message: "Usuario no encontrado", error: true };
  }
  
  const deletedUser = data.users.splice(userIndex, 1);
  return { message: "Usuario eliminado", error: false, user: deletedUser[0] };
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};