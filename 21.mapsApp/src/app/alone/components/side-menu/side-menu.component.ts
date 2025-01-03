import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// interfaz para las opciones del menu
interface MenuItem {
  name : string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true, // convertimos a standalone
  imports: [CommonModule, RouterModule], // importamos los modulos para que el componente funcione correctamente
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/zoom-range', name: 'ZoomRange' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
    { route: '/alone', name: 'Alone Page' }, // ruta para alone page
  ];
}
