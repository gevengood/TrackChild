const firebase = require("../db/firebase");
const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;

const MainFactory = require("./mainFactory");
const mainFactory = new MainFactory();
const userFactory = mainFactory.getUserFactory();

// Obtener todos los usuarios
const getAllUsers = async () => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data();
    if ("userPassword" in data) delete data.userPassword;
    return { id: doc.id, ...data };
  });
  return { message: "Usuarios obtenidos", error: false, users };
};

// Crear un nuevo usuario con Singleton 
const createUser = async (userData) => {
  if (!userData) {
    return { message: "No se proporcionaron datos de usuario", error: true };
  }
  try {
    //await al método del Singleton
    const newUser = await userFactory.createUser(userData);



    const json = typeof newUser.toJSON === "function" ? newUser.toJSON() : { ...newUser };
    if ("userPassword" in json) delete json.userPassword;

    return { message: "Usuario creado", error: false, user: json };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Obtener usuario por ID 
const getUserById = async (userId) => {
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    return { message: "Usuario no encontrado", error: true };
  }
  const data = doc.data();
  if ("userPassword" in data) delete data.userPassword;
  return { message: "Usuario encontrado", error: false, user: data };
};

// Actualizar usuario
const updateUser = async (userId, userData) => {
  try {
    await db.collection("users").doc(userId).update(userData);
    const updatedUser = await db.collection("users").doc(userId).get();
    const data = updatedUser.data();
    if ("userPassword" in data) delete data.userPassword;
    return { message: "Usuario actualizado", error: false, user: data };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Eliminar usuario
const deleteUser = async (userId) => {
  try {
    const ref = db.collection("users").doc(userId);
    const doc = await ref.get();
    if (!doc.exists) {
      return { message: "Usuario no encontrado", error: true };
    }
    await ref.delete();
    const data = doc.data();
    if ("userPassword" in data) delete data.userPassword;
    return { message: "Usuario eliminado", error: false, user: data };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
