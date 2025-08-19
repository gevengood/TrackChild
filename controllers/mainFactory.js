

const reportFactory = require("../factories/ReportFactory");
const userFactory = require("../factories/UserFactory");
/**
 * MainFactory centraliza la creación y acceso a las fábricas principales de la aplicación.
 * Implementa el patrón Singleton para asegurar que solo exista una instancia de MainFactory.
 * 
 * Propiedades:
 *  - _reportFactory: instancia de la fábrica de reportes.
 *  - _userFactory: instancia de la fábrica de usuarios.
 * 
 * Métodos:
 *  - getReportFactory(): retorna la instancia de la fábrica de reportes.
 *  - getUserFactory(): retorna la instancia de la fábrica de usuarios.
 */

class MainFactory {
  constructor() {
    // Si no existe una instancia previa, inicializa las fábricas y guarda la instancia única.

    if (!MainFactory.instance) {
      this._reportFactory = reportFactory; 
      this._userFactory = userFactory;
      MainFactory.instance = this;
    }
   // Retorna siempre la instancia única.

    return MainFactory.instance;
  }
  // Retorna la fábrica de reportes.
  getReportFactory() { return this._reportFactory; }
  // Retorna la fábrica de usuarios.
  getUserFactory()   { return this._userFactory; }
}
module.exports = MainFactory;
