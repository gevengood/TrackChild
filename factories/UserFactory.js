const User = require('../models/User');
const { hashPassword } = require('../utils/passwordHasher');

class UserFactory {
  constructor(data) {
    this.data = data;
  }

  createUser(userData) {
    if (!userData.userMail || !userData.userPassword) {
      throw new Error('Email y contraseña son requeridos');
    }

    const userId = require('../utils/idGenerator')();
    const hashedPassword = hashPassword(userData.userPassword);

    return new User({
      userId,
      userName: userData.userName,
      userMail: userData.userMail,
      userPhone: userData.userPhone,
      userPassword: hashedPassword
    });
  }

  updateUser(userId, userData) {
    const user = this.data.users.find(u => u.userId === userId);
    if (!user) throw new Error('Usuario no encontrado');

    return new User({
      ...user,
      ...userData,
      userId // Mantener el mismo ID
    });
  }
}

module.exports = UserFactory;