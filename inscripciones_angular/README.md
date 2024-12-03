# App2Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## update

Run `ng update` 

===========================================

Ejercicio documentado en:
Carga de un archivo JSON mediante HttpClient y más sobre control de flujo (hasta antes de vinculación de propiedades)
https://docs.google.com/document/d/1hEdyl2PYPTmStfu5MyipWt00Qt2D1VBk20BMPcsEykE/edit#bookmark=id.vqzyezy8rqkp

https://codigoencasa.com/los-comandos-de-angular-mas-usados/

// ----------------------------- Actualizar a la versión 18 -----------------------------

ng update @angular/core --force

En ./src/app/app.config.ts:

import { provideHttpClient } from '@angular/common/http';

Y agregar dicho provider:

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};





