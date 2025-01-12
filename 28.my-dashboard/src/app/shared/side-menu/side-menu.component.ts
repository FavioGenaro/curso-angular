import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  // routes es el arreglo con nuestra configuracion de rutas
    // usamos métodos de arreglos de javascript
  public menuItems = routes
    .map( route => route.children ?? [] )
    .flat() // aplana lo arreglos a una dimension para no tener arreglo dentro de otros
    .filter( route => route && route.path ) // excluimos las rutas con el path vacio
    .filter( route => !route.path?.includes(':') ) // excluimos la ruta con el :id

  constructor() {
    
  }
}
