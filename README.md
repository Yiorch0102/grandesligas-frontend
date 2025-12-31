# Grandes Ligas Web - Frontend

Bienvenido al repositorio del cliente web de **Grandes Ligas**. Esta es la interfaz de usuario que diseñé para interactuar con la API, construida como una Single Page Application (SPA) robusta y moderna.

## 🧠 Arquitectura y Decisiones de Diseño

Para el frontend, opté por **Angular 17+** debido a su estructura tipada y modular, ideal para proyectos empresariales escalables.

1.  **Componentes Standalone:** Utilicé la nueva arquitectura `standalone` de Angular para reducir el "boilerplate" (módulos innecesarios) y hacer la aplicación más ligera.
2.  **Interceptors:** Implementé un `AuthInterceptor` que gestiona la seguridad automáticamente. Si detecta que el usuario va a una ruta protegida, inyecta el Token JWT. Si va al Login/Registro, inteligentemente no envía nada para evitar errores 403.
3.  **Servicios:** Toda la comunicación con la API está centralizada en servicios (`auth.service.ts`, `jugadores.service.ts`), separando la lógica de datos de la lógica de vista.
4.  **UI/UX:** Integré **AdminLTE 3** para tener un panel de administración profesional y responsive desde el primer día, junto con **SweetAlert2** para mejorar la experiencia de usuario en las notificaciones.

## 🛠 Tecnologías Clave

* **Framework:** Angular 17+
* **Lenguaje:** TypeScript
* **Estilos:** AdminLTE 3 (Bootstrap 4 based)
* **Cliente HTTP:** Angular HttpClient
* **Alertas:** SweetAlert2

## ⚙️ Configuración de API (Environment)

La aplicación está configurada para conectarse dinámicamente al backend.
El archivo de configuración se encuentra en: `src/environments/environment.ts`.

```typescript
export const environment = {
  production: false,
  // Aquí defino a dónde deben apuntar las peticiones
  apiUrl: 'http://localhost:8080/api'
};



# GrandesligasFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
