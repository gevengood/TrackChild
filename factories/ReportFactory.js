const Report = require('../models/Report');

class ReportFactory {
  constructor(data) {
    this.data = data;
  }

  createReport(reportData) {
    if (!reportData.reportedBy || !reportData.nameChild) {
      throw new Error('ReportedBy y nameChild son requeridos');
    }

    const idReport = require('../utils/idGenerator')();

    return new Report({
      idReport,
      reportedBy: reportData.reportedBy,
      nameChild: reportData.nameChild,
      ageChild: reportData.ageChild,
      genderChild: reportData.genderChild,
      descriptionChild: reportData.descriptionChild,
      photoChild: reportData.photoChild || [],
      dateLostChild: reportData.dateLostChild,
      lastAddressChild: reportData.lastAddressChild,
      descriptionDisappearanceChild: reportData.descriptionDisappearanceChild
    });
  }

  updateReport(reportId, reportData) {
    const report = this.data.reports.find(r => r.idReport === reportId);
    if (!report) throw new Error('Reporte no encontrado');

    return new Report({
      ...report,
      ...reportData,
      idReport: reportId // Mantener el mismo ID
    });
  }
}

module.exports = ReportFactory;