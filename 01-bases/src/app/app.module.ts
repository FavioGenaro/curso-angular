import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';
import { DbzModule } from './dbz/dbz.module';


@NgModule({
  declarations: [ // aqui debemos declarar todos los componentes. Esto con el nombre de clase del component
    AppComponent,
  ],
  imports: [
    // es comun encontra modulos importados, los nombres aquí deben tener Module
    BrowserModule,
    CounterModule,
    HeroesModule,
    DbzModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } // es el modulo principal del que debemos tener mucho cuidado
