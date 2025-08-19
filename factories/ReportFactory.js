const firebase = require("../db/firebase");
const Report = require("../models/Report");

class ReportFactory {
  constructor() {
    const db = typeof firebase.getDB === "function" ? firebase.getDB() : firebase;
    this.collection = db.collection("reports");
  }

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

  async getReports() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => new Report(doc.data()));
  }

  async getReportById(reportId) {
    const doc = await this.collection.doc(reportId).get();
    if (!doc.exists) return null;
    return new Report(doc.data());
  }

  async updateReport(reportId, reportData) {
    const docRef = this.collection.doc(reportId);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error("Reporte no encontrado");

    const updatedData = { ...doc.data(), ...reportData, idReport: reportId };
    await docRef.set(updatedData);
    return new Report(updatedData);
  }

  async deleteReport(reportId) {
    await this.collection.doc(reportId).delete();
    return true;
  }
}

module.exports = new ReportFactory();
