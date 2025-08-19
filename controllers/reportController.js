/**
 * Controlador de reportes.
 * Proporciona funciones para gestionar reportes en la base de datos Firebase.
 * 
 * Funciones:
 *  - getAllReports: Obtiene todos los reportes.
 *  - createReport: Crea un nuevo reporte y actualiza el historial del usuario.
 *  - getReportById: Obtiene un reporte por su ID.
 *  - updateReport: Actualiza los datos de un reporte existente.
 *  - deleteReport: Elimina un reporte y actualiza el historial de todos los usuarios.
 * 
 * Dependencias:
 *  - admin: SDK de Firebase Admin para operaciones avanzadas.
 *  - firebase: Módulo de conexión a la base de datos.
 *  - MainFactory: Centraliza el acceso a la fábrica de reportes.
 */
const admin = require("firebase-admin");
const firebase = require("../db/firebase");
const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;

const MainFactory = require("./mainFactory");
const mainFactory = new MainFactory();
const reportFactory = mainFactory.getReportFactory();

/**
 * Obtiene todos los reportes de la colección "reports".
 * Objeto con mensaje, estado de error y lista de reportes.
 */

const getAllReports = async () => {
  const snapshot = await db.collection("reports").get();
  const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { message: "Reportes obtenidos", error: false, reports };
};

/**
 * Crea un nuevo reporte y actualiza el historial del usuario que lo reportó.
 * @param {Object} reportData - Datos del reporte.
 * @returns {Object} Objeto con mensaje, estado de error y el reporte creado.
 */
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

/**
 * Obtiene un reporte por su ID.
 * @param {string} reportId - ID del reporte.
 * @returns {Object} Objeto con mensaje, estado de error y el reporte encontrado.
 */
const getReportById = async (reportId) => {
  const doc = await db.collection("reports").doc(reportId).get();
  if (!doc.exists) {
    return { message: "Reporte no encontrado", error: true };
  }
  return { message: "Reporte encontrado", error: false, report: doc.data() };
};


/**
 * Actualiza los datos de un reporte existente.
 * @param {string} reportId - ID del reporte.
 * @param {Object} reportData - Datos actualizados del reporte.
 * @returns {Object} Objeto con mensaje, estado de error y el reporte actualizado.
 */


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

/**
 * Elimina un reporte y actualiza el historial de todos los usuarios.
 * @param {string} reportId - ID del reporte a eliminar.
 * @returns {Object} Objeto con mensaje, estado de error y el reporte eliminado.
 */

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


/**
 * Exporta las funciones del controlador de reportes.
 */

module.exports = {
  getAllReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
};
