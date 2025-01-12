import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

// Ingresamos las rutas
// Importamos al provider el withViewTransitions que se importa del router y agrega la transicion al cambio de ruta.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true, // no se anima la primera transicion
        // onViewTransitionCreated( transitionInfo ) {
        //   console.log({transitionInfo}); // podemos ver data sobre la ruta de origen y de destino, si se realizo la carga, etc.
        // },
      } ),
    ),
    // Aqui importamos los modulos que se usarán en la aplicación
    importProvidersFrom(
      HttpClientModule,
    )
  ]
};
