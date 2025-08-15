const data = require('../data-dummy/data.json');
const MainFactory = require('./mainFactory');
const mainFactory = new MainFactory();
const reportFactory = mainFactory.getReportFactory();

// Obtener todos los reportes
const getAllReports = () => {
  return data.reports;
};

// Crear nuevo reporte
const createReport = (reportData) => {
  if (!reportData) {
    return { message: "No se proporcionaron datos del reporte", error: true };
  }
  
  try {
    const newReport = reportFactory.createReport(reportData);
    data.reports.push(newReport);
    
    // Actualizar historial del usuario
    const userIndex = data.users.findIndex(u => u.userId === reportData.reportedBy);
    if (userIndex !== -1) {
      data.users[userIndex].reportHistory.push(newReport.idReport);
    }
    
    return { message: "Reporte creado", error: false, report: newReport };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Obtener reporte por ID
const getReportById = (reportId) => {
  const report = data.reports.find(r => r.idReport === reportId);
  if (!report) {
    return { message: "Reporte no encontrado", error: true };
  }
  return { message: "Reporte encontrado", error: false, report };
};

// Actualizar reporte
const updateReport = (reportId, reportData) => {
  const reportIndex = data.reports.findIndex(r => r.idReport === reportId);
  if (reportIndex === -1) {
    return { message: "Reporte no encontrado", error: true };
  }
  
  try {
    const updatedReport = reportFactory.updateReport(reportId, reportData);
    data.reports[reportIndex] = updatedReport;
    return { message: "Reporte actualizado", error: false, report: updatedReport };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

// Eliminar reporte
const deleteReport = (reportId) => {
  const reportIndex = data.reports.findIndex(r => r.idReport === reportId);
  if (reportIndex === -1) {
    return { message: "Reporte no encontrado", error: true };
  }
  
  const deletedReport = data.reports.splice(reportIndex, 1);
  
  // Eliminar referencia del usuario
  data.users.forEach(user => {
    user.reportHistory = user.reportHistory.filter(id => id !== reportId);
  });
  
  return { message: "Reporte eliminado", error: false, report: deletedReport[0] };
};

module.exports = {
  getAllReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport
};