/**
 * UserFactory
 * Fábrica para la gestión de usuarios en la base de datos Firebase.
 * Proporciona métodos para crear, obtener, actualizar y eliminar usuarios.
 * 
 * Métodos:
 *  - createUser(userData): Crea un nuevo usuario y lo guarda en la colección "users".
 *  - getUsers(): Obtiene todos los usuarios como instancias de User.
 *  - getUserById(userId): Obtiene un usuario por su ID.
 *  - getUserByEmail(userMail): Obtiene un usuario por su email.
 *  - updateUser(userId, userData): Actualiza los datos de un usuario existente.
 *  - deleteUser(userId): Elimina un usuario por su ID.
 * 
 * Dependencias:
 *  - firebase: Módulo de conexión a la base de datos.
 *  - User: Modelo de datos para los usuarios.
 *  - hashPassword: Utilidad para hashear contraseñas.
 *  - generateId: Utilidad para generar IDs únicos.
 */


const firebase = require("../db/firebase");
const User = require("../models/User");
const { hashPassword } = require("../utils/passwordHasher");
const generateId = require("../utils/idGenerator");

/**
 * Envuelve una función para asegurar que siempre retorna una promesa.
 * @param {Function} fn - Función a ejecutar.
 * @param {...any} args - Argumentos para la función.
 * @returns {Promise<any>} Promesa con el resultado.
 */
const maybeAsync = (fn, ...args) => {
  const r = fn(...args);
  return r && typeof r.then === "function" ? r : Promise.resolve(r);
};

class UserFactory {

    /**
   * Constructor de UserFactory.
   * Inicializa la referencia a la colección "users" en Firestore.
   */
  constructor() {
    const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;
    this.collection = db.collection("users");
  }

  /**
   * Crea un nuevo usuario y lo guarda en la colección.
   * @param {Object} userData - Datos del usuario.
   * @returns {User} Instancia del usuario creado.
   * @throws {Error} Si faltan campos requeridos o el email ya existe.
   */
  async createUser(userData) {
    if (!userData?.userMail || !userData?.userPassword) {
      throw new Error("Email y contraseña son requeridos");
    }

    const exists = await this.collection.where("userMail", "==", userData.userMail).limit(1).get();
    if (!exists.empty) throw new Error("Ya existe un usuario con ese email");

    const userId = generateId();
    const hashedPassword = await maybeAsync(hashPassword, userData.userPassword);

    const newUser = new User({
      userId,
      userName: userData.userName,
      userMail: userData.userMail,
      userPhone: userData.userPhone,
      userPassword: hashedPassword,
    });

    const payload = typeof newUser.toFirestore === "function" ? newUser.toFirestore() : { ...newUser };
    await this.collection.doc(userId).set(payload);

    return newUser;
  }
  /**
   * Obtiene todos los usuarios de la colección.
   * @returns {User[]} Array de instancias de User.
   */
  async getUsers() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => new User(doc.data()));
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {User|null} Instancia de User o null si no existe.
   */
  async getUserById(userId) {
    const doc = await this.collection.doc(userId).get();
    if (!doc.exists) return null;
    return new User(doc.data());
  }
  /**
   * Obtiene un usuario por su email.
   * @param {string} userMail - Email del usuario.
   * @returns {User|null} Instancia de User o null si no existe.
   */
  async getUserByEmail(userMail) {
    const snap = await this.collection.where("userMail", "==", userMail).limit(1).get();
    if (snap.empty) return null;
    return new User(snap.docs[0].data());
  }
  /**
   * Actualiza los datos de un usuario existente.
   * @param {string} userId - ID del usuario.
   * @param {Object} userData - Datos actualizados.
   * @returns {User} Instancia del usuario actualizado.
   * @throws {Error} Si el usuario no existe.
   */
  async updateUser(userId, userData) {
    const ref = this.collection.doc(userId);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Usuario no encontrado");

    const updated = { ...doc.data(), ...userData, userId };
    await ref.set(updated);
    return new User(updated);
  }
  /**
   * Elimina un usuario por su ID.
   * @param {string} userId - ID del usuario.
   * @returns {boolean} true si se elimina correctamente.
   */
  async deleteUser(userId) {
    await this.collection.doc(userId).delete();
    return true;
  }
}

/**
 * Exporta una instancia única de UserFactory.
 */
module.exports = new UserFactory(); // Singleton
