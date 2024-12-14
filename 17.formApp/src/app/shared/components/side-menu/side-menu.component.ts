import { Component } from '@angular/core';

// Para definir cada item del menu
interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  // opciones para el modulo reactive
  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];
  // opciones para el modulo de autenticacion
  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ];

}
