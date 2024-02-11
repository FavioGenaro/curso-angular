import { NgModule } from '@angular/core';

// el common no es necesario al crear el modulo, pero lo normal es que tengamos componentes que usen
// una directiva, por lo que es mejor mantenerlo.
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DbzModule { }
