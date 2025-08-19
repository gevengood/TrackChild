/**
 * Modelo Report
 * Representa la estructura de un reporte de niño desaparecido.
 * Permite la conversión entre objetos JavaScript y formatos compatibles con Firestore y JSON.
 * 
 * Propiedades:
 *  - idReport: Identificador único del reporte.
 *  - reportedBy: ID del usuario que reporta.
 *  - nameChild: Nombre del niño.
 *  - ageChild: Edad del niño.
 *  - genderChild: Género del niño.
 *  - descriptionChild: Descripción física del niño.
 *  - photoChild: Array de URLs de fotos.
 *  - dateLostChild: Fecha de desaparición.
 *  - lastAddressChild: Última dirección conocida.
 *  - coordinatesDisappearanceChild: Coordenadas de desaparición.
 *  - descriptionDisappearanceChild: Descripción del evento de desaparición.
 *  - statusChild: Estado del reporte (por defecto "missing").
 *  - createdAt: Fecha de creación del reporte.
 * 
 * Métodos:
 *  - toJSON(): Convierte la instancia a un objeto JSON serializable.
 *  - toFirestore(): Convierte la instancia a un objeto compatible con Firestore.
 */

const { v4: uuidv4 } = require("uuid");

class Report {
    /**
   * Constructor de Report.
   * @param {Object} params - Parámetros para inicializar el reporte.
   */
  constructor({
    idReport = uuidv4(),
    reportedBy,
    nameChild,
    ageChild,
    genderChild,
    descriptionChild,
    photoChild = [],
    dateLostChild,
    lastAddressChild,
    coordinatesDisappearanceChild = null,
    descriptionDisappearanceChild,
    statusChild = "missing",
    createdAt = new Date(),
  }) {
    if (!reportedBy || !nameChild || !dateLostChild) {
      throw new Error("Missing required fields");
    }

    this.idReport = idReport;
    this.reportedBy = reportedBy;
    this.nameChild = nameChild;
    this.ageChild = ageChild;
    this.genderChild = genderChild;
    this.descriptionChild = descriptionChild;
    this.photoChild = photoChild;
    
    // Convierte dateLostChild a objeto Date si es necesario
    this.dateLostChild = dateLostChild.toDate
      ? dateLostChild.toDate()
      : new Date(dateLostChild);

    this.lastAddressChild = lastAddressChild;
    this.coordinatesDisappearanceChild = coordinatesDisappearanceChild;
    this.descriptionDisappearanceChild = descriptionDisappearanceChild;
    this.statusChild = statusChild;
    // Convierte createdAt a objeto Date si es necesario
    this.createdAt = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
  }

  toJSON() {
    return {
      idReport: this.idReport,
      reportedBy: this.reportedBy,
      nameChild: this.nameChild,
      ageChild: this.ageChild,
      genderChild: this.genderChild,
      descriptionChild: this.descriptionChild,
      photoChild: this.photoChild,
      dateLostChild: this.dateLostChild.toISOString(),
      lastAddressChild: this.lastAddressChild,
      coordinatesDisappearanceChild: this.coordinatesDisappearanceChild,
      descriptionDisappearanceChild: this.descriptionDisappearanceChild,
      statusChild: this.statusChild,
      createdAt: this.createdAt.toISOString(),
    };
  }


  /**
   * Convierte la instancia a un objeto compatible con Firestore.
   * @returns {Object} Objeto para guardar en Firestore.
   */
  toFirestore() {
    return {
      idReport: this.idReport,
      reportedBy: this.reportedBy,
      nameChild: this.nameChild,
      ageChild: this.ageChild,
      genderChild: this.genderChild,
      descriptionChild: this.descriptionChild,
      photoChild: this.photoChild,
      dateLostChild: this.dateLostChild,
      lastAddressChild: this.lastAddressChild,
      coordinatesDisappearanceChild: this.coordinatesDisappearanceChild,
      descriptionDisappearanceChild: this.descriptionDisappearanceChild,
      statusChild: this.statusChild,
      createdAt: this.createdAt, 
    };
  }
}

module.exports = Report;
