const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../utils/passwordHasher");

class User {
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

  
    if (userPassword && userPassword.length < 60) {
      this.userPassword = hashPassword(userPassword);
    } else {
      this.userPassword = userPassword;
    }

    this.reportHistory = reportHistory;

    
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
