const UserFactory = require('../factories/UserFactory');
const ReportFactory = require('../factories/ReportFactory');
const data = require('../data-dummy/data.json');

class MainFactory {
  constructor() {
    this.userFactory = new UserFactory(data);
    this.reportFactory = new ReportFactory(data);
  }

  getUserFactory() {
    return this.userFactory;
  }

  getReportFactory() {
    return this.reportFactory;
  }
}

module.exports = MainFactory;