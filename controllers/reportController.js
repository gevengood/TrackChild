const admin = require("firebase-admin");
const firebase = require("../db/firebase");
const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;

const MainFactory = require("./mainFactory");
const mainFactory = new MainFactory();
const reportFactory = mainFactory.getReportFactory();


const getAllReports = async () => {
  const snapshot = await db.collection("reports").get();
  const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { message: "Reportes obtenidos", error: false, reports };
};

// Crear nuevo reporte
const createReport = async (reportData) => {
  if (!reportData) {
    return { message: "No se proporcionaron datos del reporte", error: true };
  }
  try {
    // SINGLETON 
    const newReport = await reportFactory.createReport(reportData);

    // actualizar historial del usuario
    await db.collection("users").doc(reportData.reportedBy).update({
      reportHistory: admin.firestore.FieldValue.arrayUnion(newReport.idReport),
    });

    return {
      message: "Reporte creado",
      error: false,
      report:
        typeof newReport.toJSON === "function" ? newReport.toJSON() : { ...newReport },
    };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const getReportById = async (reportId) => {
  const doc = await db.collection("reports").doc(reportId).get();
  if (!doc.exists) {
    return { message: "Reporte no encontrado", error: true };
  }
  return { message: "Reporte encontrado", error: false, report: doc.data() };
};

const updateReport = async (reportId, reportData) => {
  try {
    await db.collection("reports").doc(reportId).update(reportData);
    const updatedReport = await db.collection("reports").doc(reportId).get();
    return {
      message: "Reporte actualizado",
      error: false,
      report: updatedReport.data(),
    };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const deleteReport = async (reportId) => {
  try {
    const doc = await db.collection("reports").doc(reportId).get();
    if (!doc.exists) {
      return { message: "Reporte no encontrado", error: true };
    }

    await db.collection("reports").doc(reportId).delete();

    const usersSnapshot = await db.collection("users").get();
    for (const userDoc of usersSnapshot.docs) {
      await db.collection("users").doc(userDoc.id).update({
        reportHistory: admin.firestore.FieldValue.arrayRemove(reportId),
      });
    }

    return { message: "Reporte eliminado", error: false, report: doc.data() };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

module.exports = {
  getAllReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
};
