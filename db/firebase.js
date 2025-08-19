/**
 * Módulo de conexión a Firebase usando el patrón Singleton.
 * Inicializa la aplicación de Firebase Admin y expone métodos para acceder a Firestore.
 * 
 * Características:
 *  - Inicializa Firebase Admin solo una vez por aplicación.
 *  - Permite obtener la instancia de la base de datos Firestore.
 *  - Expone utilidades de Firestore como FieldValue y Timestamp.
 * 
 * Uso:
 *   const firebase = require('./db/firebase');
 *   const db = firebase.getDB();
 *   const FieldValue = firebase.FieldValue;
 *   const Timestamp = firebase.Timestamp;
 * 
 * Dependencias:
 *  - firebase-admin: SDK de Firebase Admin.
 *  - path: Utilidad para manejar rutas de archivos.
 */

const admin = require("firebase-admin");
const path = require("path");

class FirebaseSingleton {
   /**
   * Constructor Singleton.
   * Inicializa la app de Firebase Admin si no existe.
   * Configura Firestore y guarda la instancia única.
   */ 
  constructor() {
    if (!FirebaseSingleton.instance) {
      
        // Inicializa Firebase Admin solo si no hay apps previas

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

      // Configura Firestore y sus propiedades  
      this.db = admin.firestore();
      this.db.settings({ ignoreUndefinedProperties: true }); 

      FirebaseSingleton.instance = this;
      Object.freeze(this); // Protege la instancia
    }
    return FirebaseSingleton.instance;
  }

   /**
   * Obtiene la instancia de la base de datos Firestore.
   * @returns {FirebaseFirestore.Firestore} Instancia de Firestore.
   */
  getDB() {
    return this.db;
  }

  /**
   * Acceso a FieldValue de Firestore.
   * @returns {typeof admin.firestore.FieldValue}
   */

  get FieldValue() {
    return admin.firestore.FieldValue;
  }
  /**
   * Acceso a Timestamp de Firestore.
   * @returns {typeof admin.firestore.Timestamp}
   */
  get Timestamp() {
    return admin.firestore.Timestamp;
  }
}

// Instancia única exportada para toda la aplicación

const firebaseInstance = new FirebaseSingleton();
module.exports = firebaseInstance;
