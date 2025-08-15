const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../utils/passwordHasher');

class User {
  constructor({
    userId = uuidv4(),
    userName,
    userMail,
    userPhone,
    userPassword,
    reportHistory = [],
    createdAt = new Date()
  }) {
    if (!userMail || !userPassword) {
      throw new Error('Email and password are required');
    }

    this.userId = userId;
    this.userName = userName;
    this.userMail = userMail;
    this.userPhone = userPhone;
    this.userPassword = hashPassword(userPassword); // Cifrado automático
    this.reportHistory = reportHistory;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      userId: this.userId,
      userName: this.userName,
      userMail: this.userMail,
      userPhone: this.userPhone,
      userPassword: this.userPassword, // Ya cifrado
      reportHistory: this.reportHistory,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Para Firebase (si luego lo implementas)
  toFirestore() {
    return {
      userId: this.userId,
      userName: this.userName,
      userMail: this.userMail,
      userPhone: this.userPhone,
      userPassword: this.userPassword,
      reportHistory: this.reportHistory,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;