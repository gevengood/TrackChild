/**
 * Modelo User
 * Representa la estructura de un usuario en el sistema.
 * Permite la conversión entre objetos JavaScript y formatos compatibles con Firestore y JSON.
 * 
 * Propiedades:
 *  - userId: Identificador único del usuario.
 *  - userName: Nombre del usuario.
 *  - userMail: Correo electrónico del usuario.
 *  - userPhone: Teléfono del usuario.
 *  - userPassword: Contraseña hasheada del usuario.
 *  - reportHistory: Array de IDs de reportes asociados al usuario.
 *  - createdAt: Fecha de creación del usuario.
 * 
 * Métodos:
 *  - toJSON(): Convierte la instancia a un objeto JSON serializable.
 *  - toFirestore(): Convierte la instancia a un objeto compatible con Firestore.
 */

const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../utils/passwordHasher");

class User {
  /**
   * Constructor de User.
   * @param {Object} params - Parámetros para inicializar el usuario.
   */
  constructor({
    userId = uuidv4(),
    userName,
    userMail,
    userPhone,
    userPassword,
    reportHistory = [],
    createdAt = new Date(),
  }) {
    if (!userMail || !userPassword) {
      throw new Error("Email and password are required");
    }

    this.userId = userId;
    this.userName = userName;
    this.userMail = userMail;
    this.userPhone = userPhone;

      // Hashea la contraseña si no está hasheada

    if (userPassword && userPassword.length < 60) {
      this.userPassword = hashPassword(userPassword);
    } else {
      this.userPassword = userPassword;
    }

    this.reportHistory = reportHistory;

        // Convierte createdAt a objeto Date si es necesario

    this.createdAt = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
  }

  toJSON() {
    return {
      userId: this.userId,
      userName: this.userName,
      userMail: this.userMail,
      userPhone: this.userPhone,
      userPassword: this.userPassword, 
      reportHistory: this.reportHistory,
      createdAt: this.createdAt.toISOString(),
    };
  }
  /**
   * Convierte la instancia a un objeto compatible con Firestore.
   * @returns {Object} Objeto para guardar en Firestore.
   */
  toFirestore() {
    return {
      userId: this.userId,
      userName: this.userName,
      userMail: this.userMail,
      userPhone: this.userPhone,
      userPassword: this.userPassword,
      reportHistory: this.reportHistory,
      createdAt: this.createdAt, 
    };
  }
}

module.exports = User;
