const admin = require("firebase-admin");
const path = require("path");

class FirebaseSingleton {
  constructor() {
    if (!FirebaseSingleton.instance) {
      
      if (!admin.apps.length) {
    
        const credsPath =
          process.env.GOOGLE_APPLICATION_CREDENTIALS ||
          path.resolve(
            __dirname,
            "proyecto-arqui-29b6b-firebase-adminsdk-fbsvc-ec04ad8fae.json"
          );

        
        admin.initializeApp({
          credential: admin.credential.cert(require(credsPath)),
        });
      }

  
      this.db = admin.firestore();
      this.db.settings({ ignoreUndefinedProperties: true }); 

      FirebaseSingleton.instance = this;
      Object.freeze(this); 
    }
    return FirebaseSingleton.instance;
  }

  getDB() {
    return this.db;
  }

  
  get FieldValue() {
    return admin.firestore.FieldValue;
  }
  get Timestamp() {
    return admin.firestore.Timestamp;
  }
}

const firebaseInstance = new FirebaseSingleton();
module.exports = firebaseInstance;
