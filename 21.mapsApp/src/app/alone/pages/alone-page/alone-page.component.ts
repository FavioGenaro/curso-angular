import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-alone-page',
  standalone: true, // esto lo hace un componente standalone
  imports: [ CommonModule, CounterAloneComponent, SideMenuComponent ], // Podemos importar modulos o componentes. Podemos verlo como un modulo con un solo componente 
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

  // si queremos hacer inyección de dependencias debemos importar es servicio o modulo
  constructor(){}

}
