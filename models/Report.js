const { v4: uuidv4 } = require('uuid');

class Report {
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
    statusChild = 'missing',
    createdAt = new Date()
  }) {
    if (!reportedBy || !nameChild || !dateLostChild) {
      throw new Error('Missing required fields');
    }

    this.idReport = idReport;
    this.reportedBy = reportedBy;
    this.nameChild = nameChild;
    this.ageChild = ageChild;
    this.genderChild = genderChild;
    this.descriptionChild = descriptionChild;
    this.photoChild = photoChild;
    this.dateLostChild = new Date(dateLostChild);
    this.lastAddressChild = lastAddressChild;
    this.coordinatesDisappearanceChild = coordinatesDisappearanceChild;
    this.descriptionDisappearanceChild = descriptionDisappearanceChild;
    this.statusChild = statusChild;
    this.createdAt = createdAt;
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
      createdAt: this.createdAt.toISOString()
    };
  }

  // Para Firebase 
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
      createdAt: this.createdAt
    };
  }
}

module.exports = Report;