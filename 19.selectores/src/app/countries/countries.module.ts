import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule, // importamos las rutas para ete modulo
    ReactiveFormsModule, // Modulo para los formularios rectivos
  ],
  exports: [
    SelectorPageComponent
  ],
  providers: [ /* Sirve para declarar o importar servicios angular**/ ]
})
export class CountriesModule { }
