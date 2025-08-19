/**
 * ReportFactory
 * Fábrica para la gestión de reportes en la base de datos Firebase.
 * Proporciona métodos para crear, obtener, actualizar y eliminar reportes.
 * 
 * Métodos:
 *  - createReport(reportData): Crea un nuevo reporte y lo guarda en la colección "reports".
 *  - getReports(): Obtiene todos los reportes como instancias de Report.
 *  - getReportById(reportId): Obtiene un reporte por su ID.
 *  - updateReport(reportId, reportData): Actualiza los datos de un reporte existente.
 *  - deleteReport(reportId): Elimina un reporte por su ID.
 * 
 * Dependencias:
 *  - firebase: Módulo de conexión a la base de datos.
 *  - Report: Modelo de datos para los reportes.
 */


const firebase = require("../db/firebase");
const Report = require("../models/Report");

class ReportFactory {
   /**
   * Constructor de ReportFactory.
   * Inicializa la referencia a la colección "reports" en Firestore.
   */
  constructor() {
    const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;
    this.collection = db.collection("reports");
  }
/**
   * Crea un nuevo reporte y lo guarda en la colección.
   * @param {Object} reportData - Datos del reporte.
   * @returns {Report} Instancia del reporte creado.
   * @throws {Error} Si faltan campos requeridos.
   */
  async createReport(reportData) {
    if (!reportData?.reportedBy || !reportData?.nameChild) {
      throw new Error("ReportedBy y nameChild son requeridos");
    }

  
    const ref = this.collection.doc();
    const idReport = ref.id;

    const newReport = new Report({
      idReport,
      reportedBy: reportData.reportedBy,
      nameChild: reportData.nameChild,
      ageChild: reportData.ageChild ?? null,
      genderChild: reportData.genderChild ?? null,
      descriptionChild: reportData.descriptionChild ?? null,
      photoChild: Array.isArray(reportData.photoChild) ? reportData.photoChild.filter(Boolean) : [],
      dateLostChild: reportData.dateLostChild ?? null, 
      lastAddressChild: reportData.lastAddressChild ?? null,
      descriptionDisappearanceChild: reportData.descriptionDisappearanceChild ?? null,
      statusChild: "missing",
      createdAt: firebase.Timestamp.now(),
    });

    const payload = typeof newReport.toFirestore === "function"
      ? newReport.toFirestore()
      : { ...newReport };

    await ref.set(payload);

    return newReport;
  }

    /**
   * Obtiene todos los reportes de la colección.
   * @returns {Report[]} Array de instancias de Report.
   */
  async getReports() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => new Report(doc.data()));
  }
  /**
   * Obtiene un reporte por su ID.
   * @param {string} reportId - ID del reporte.
   * @returns {Report|null} Instancia de Report o null si no existe.
   */
  async getReportById(reportId) {
    const doc = await this.collection.doc(reportId).get();
    if (!doc.exists) return null;
    return new Report(doc.data());
  }
  /**
   * Actualiza los datos de un reporte existente.
   * @param {string} reportId - ID del reporte.
   * @param {Object} reportData - Datos actualizados.
   * @returns {Report} Instancia del reporte actualizado.
   * @throws {Error} Si el reporte no existe.
   */
  async updateReport(reportId, reportData) {
    const docRef = this.collection.doc(reportId);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error("Reporte no encontrado");

    const updatedData = { ...doc.data(), ...reportData, idReport: reportId };
    await docRef.set(updatedData);
    return new Report(updatedData);
  }
  /**
   * Elimina un reporte por su ID.
   * @param {string} reportId - ID del reporte.
   * @returns {boolean} true si se elimina correctamente.
   */
  async deleteReport(reportId) {
    await this.collection.doc(reportId).delete();
    return true;
  }
}

module.exports = new ReportFactory();
