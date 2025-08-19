// testFirebase.js
const firebase = require("./db/firebase");

async function test() {
  try {
    const db = firebase.getDB();

    // 1. Escribir un documento de prueba
    const docRef = db.collection("testCollection").doc("testDoc");
    await docRef.set({
      name: "Santiago",
      createdAt: new Date()
    });

    console.log("✅ Documento guardado en Firestore");

    // 2. Leer el documento guardado
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("📄 Documento leído:", doc.data());
    } else {
      console.log("⚠️ Documento no encontrado");
    }

  } catch (error) {
    console.error("❌ Error probando Firebase:", error);
  }
}

test();
