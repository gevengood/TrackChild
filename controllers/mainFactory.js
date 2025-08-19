const reportFactory = require("../factories/ReportFactory");
const userFactory = require("../factories/UserFactory");

class MainFactory {
  constructor() {
    if (!MainFactory.instance) {
      this._reportFactory = reportFactory; // singletons
      this._userFactory = userFactory;
      MainFactory.instance = this;
    }
    return MainFactory.instance;
  }
  getReportFactory() { return this._reportFactory; }
  getUserFactory()   { return this._userFactory; }
}
module.exports = MainFactory;
