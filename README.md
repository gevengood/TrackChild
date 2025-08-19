# Proyecto de Diseño de Software – Corte Uno: TrackChild

## 🧠 Presentación del Problema

TrackChild es una plataforma para la gestión y seguimiento de reportes de niños desaparecidos. El sistema permite a usuarios registrar casos, consultar información y actualizar el estado de los reportes. Este problema es relevante para familias, autoridades y organizaciones que buscan una respuesta rápida y centralizada ante desapariciones infantiles.


## 🧱 Fundamentos de Ingeniería de Software

El sistema prioriza los siguientes atributos de calidad:
- **Mantenibilidad:** Código modular y documentado, facilitando actualizaciones y correcciones.
- **Escalabilidad:** Uso de patrones Singleton y Factory para permitir crecimiento y adaptación.
- **Seguridad:** Hash de contraseñas y control de acceso a datos sensibles.

## 🧩 Diseño de Software

**Principios SOLID aplicados:**
- **S**: Responsabilidad Única (cada clase/fábrica tiene una función clara).
- **O**: Abierto/Cerrado (las fábricas pueden extenderse sin modificar el código base).
- **D**: Inversión de Dependencias (los controladores dependen de interfaces/fábricas, no de implementaciones concretas).

**Patrones de diseño utilizados:**
- **Singleton:** Para la conexión a Firebase y las fábricas principales (`FirebaseSingleton`, `MainFactory`).
- **Factory:** Para la creación y gestión de usuarios y reportes (`UserFactory`, `ReportFactory`).

**Justificación:**
- Singleton asegura una única instancia de conexión a la base de datos, evitando errores y mejorando el rendimiento.
- Factory centraliza la lógica de creación y gestión de objetos, facilitando la mantenibilidad y escalabilidad.

**Diagramas:**
- [Diagrama de clases UML](https://drive.google.com/tu-diagrama-clases)
- [Diagrama de casos de uso](https://drive.google.com/tu-diagrama-casos-uso)
- [Diagrama de secuencia](https://drive.google.com/tu-diagrama-secuencia)

## 💻 Implementación

La estructura del código es modular:

- **app.js:** Archivo principal, define rutas y configura el servidor.
- **controllers/**: Lógica de negocio para usuarios y reportes.
  - [userController.js](./controllers/userController.js)
  - [reportController.js](./controllers/reportController.js)
- **factories/**: Fábricas para la gestión de entidades.
  - [UserFactory.js](./factories/UserFactory.js)
  - [ReportFactory.js](./factories/ReportFactory.js)
  - [mainFactory.js](./controllers/mainFactory.js)
- **models/**: Modelos de datos.
  - [User.js](./models/User.js)
  - [Report.js](./models/Report.js)
- **db/**: Conexión a Firebase.
  - [firebase.js](./db/firebase.js)
- **utils/**: Utilidades para IDs y contraseñas.
  - [idGenerator.js](./utils/idGenerator.js)
  - [passwordHasher.js](./utils/passwordHasher.js)

## 🔍 Análisis Técnico

- **Cohesión:** Cada módulo tiene una responsabilidad clara y única.
- **Bajo acoplamiento:** Los controladores interactúan con las fábricas y modelos mediante interfaces bien definidas.
- **Atributos de calidad:** El uso de patrones y principios SOLID garantiza mantenibilidad, escalabilidad y seguridad.

## 👥 Créditos y Roles

- **Jorge Doncel [rol principal]:** Arquitectura, desarrollo backend, documentación.
- **Santiago Buendia [rol principal]:** Arquitectura, desarrollo backend, conexión con la BD.
- **Santiago Pulido [rol principal]:** Desarrollo backend, diagramador.


---
*Para instalar dependencias:*
```sh
npm install

node app.js