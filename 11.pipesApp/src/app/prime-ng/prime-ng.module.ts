import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // exportamos los modulos de primeng
  // esto puede nos gustar a todos porque al usar este modulo se exportaran todos los modulos a la vez y puede que no necesitemos algunos en ciertos momentos
  // pero da la facilidad de manejar de mejor forma los modulos
  exports:[
    MenuModule
  ]
})
export class PrimeNgModule { }
