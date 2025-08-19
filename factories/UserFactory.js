const firebase = require("../db/firebase");
const User = require("../models/User");
const { hashPassword } = require("../utils/passwordHasher");
const generateId = require("../utils/idGenerator");


const maybeAsync = (fn, ...args) => {
  const r = fn(...args);
  return r && typeof r.then === "function" ? r : Promise.resolve(r);
};

class UserFactory {
  constructor() {
    const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;
    this.collection = db.collection("users");
  }

  // Crear un nuevo usuario
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

  async getUsers() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => new User(doc.data()));
  }

  async getUserById(userId) {
    const doc = await this.collection.doc(userId).get();
    if (!doc.exists) return null;
    return new User(doc.data());
  }

  async getUserByEmail(userMail) {
    const snap = await this.collection.where("userMail", "==", userMail).limit(1).get();
    if (snap.empty) return null;
    return new User(snap.docs[0].data());
  }

  async updateUser(userId, userData) {
    const ref = this.collection.doc(userId);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Usuario no encontrado");

    const updated = { ...doc.data(), ...userData, userId };
    await ref.set(updated);
    return new User(updated);
  }

  async deleteUser(userId) {
    await this.collection.doc(userId).delete();
    return true;
  }
}

module.exports = new UserFactory(); // Singleton
