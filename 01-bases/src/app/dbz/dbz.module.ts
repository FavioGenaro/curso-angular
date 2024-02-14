import { NgModule } from '@angular/core';

// el common no es necesario al crear el modulo, pero lo normal es que tengamos componentes que usen
// una directiva, por lo que es mejor mantenerlo.
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';

// importamos esto para usar la directiva ngModel dentro de los componentes
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPageComponent,
    ListComponent,
    AddCharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports:[
    MainPageComponent,
  ]
})
export class DbzModule { }
