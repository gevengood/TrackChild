/**
 * Controlador de usuarios.
 * Proporciona funciones para gestionar usuarios en la base de datos Firebase.
 * 
 * Funciones:
 *  - getAllUsers: Obtiene todos los usuarios (sin contraseñas).
 *  - createUser: Crea un nuevo usuario usando el patrón Singleton.
 *  - getUserById: Obtiene un usuario por su ID (sin contraseña).
 *  - updateUser: Actualiza los datos de un usuario.
 *  - deleteUser: Elimina un usuario por su ID.
 * 
 * Dependencias:
 *  - firebase: Módulo de conexión a la base de datos.
 *  - MainFactory: Centraliza el acceso a la fábrica de usuarios.
 */


const firebase = require("../db/firebase");
const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;

const MainFactory = require("./mainFactory");
const mainFactory = new MainFactory();
const userFactory = mainFactory.getUserFactory();

/**
 * Obtiene todos los usuarios de la colección "users".
 * Elimina la propiedad 'userPassword' antes de retornar cada usuario.
 * @returns {Object} Objeto con mensaje, estado de error y lista de usuarios.
 */
const getAllUsers = async () => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data();
    if ("userPassword" in data) delete data.userPassword;
    return { id: doc.id, ...data };
  });
  return { message: "Usuarios obtenidos", error: false, users };
};

/**
 * Crea un nuevo usuario usando el patrón Singleton.
 * Elimina la propiedad 'userPassword' antes de retornar el usuario creado.
 * @param {Object} userData - Datos del usuario.
 * @returns {Object} Objeto con mensaje, estado de error y el usuario creado.
 */
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

/**
 * Obtiene un usuario por su ID.
 * Elimina la propiedad 'userPassword' antes de retornar el usuario.
 * @param {string} userId - ID del usuario.
 * @returns {Object} Objeto con mensaje, estado de error y el usuario encontrado.
 */ 
const getUserById = async (userId) => {
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    return { message: "Usuario no encontrado", error: true };
  }
  const data = doc.data();
  if ("userPassword" in data) delete data.userPassword;
  return { message: "Usuario encontrado", error: false, user: data };
};

/**
 * Actualiza los datos de un usuario.
 * Elimina la propiedad 'userPassword' antes de retornar el usuario actualizado.
 * @param {string} userId - ID del usuario.
 * @param {Object} userData - Datos actualizados del usuario.
 * @returns {Object} Objeto con mensaje, estado de error y el usuario actualizado.
 */
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

/**
 * Elimina un usuario por su ID.
 * Elimina la propiedad 'userPassword' antes de retornar el usuario eliminado.
 * @param {string} userId - ID del usuario.
 * @returns {Object} Objeto con mensaje, estado de error y el usuario eliminado.
 */
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
/**
 * Exporta las funciones del controlador de usuarios.
 */
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
