import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// configuración del LOCALE en la app
import localeEsHN from '@angular/common/locales/es-HN'; // localeEsHN, es un nombre que nosotros definimos
import localeFrCA from '@angular/common/locales/fr-CA';
import localeEsPE from '@angular/common/locales/es-PE'; // español de Perú

// función para usar el LOCALE en la aplicación, no la establece por defecto, solo la hace disponible para usar
import { registerLocaleData } from '@angular/common';

registerLocaleData( localeEsHN );
registerLocaleData( localeFrCA );
registerLocaleData( localeEsPE );


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    // esta es la configuración para establecer un idioma por defecto en toda la APP
    // Se modifica el valor de LOCALE_ID
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
