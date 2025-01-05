import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // Una señal es un espacio en memoria que apunta o sabe donde se esta usando
  // si usamos la variable menuItems en ciertas páginas, al cambiar esta variable o señal se actualizará en todos lados

  // signal es un tipo de dato, internamente maneja un valor, que es el valor a actualizar en todos los lugares donde se este usando
  // En este caso menuItems será la referencia a la señal, pero no el valor de la señal el vvalor es menuItems()
  public menuItems = signal<MenuItem[]>([
    { title: 'Contador', route: 'counter' },
    { title: 'Usuario', route: 'user-info' },
    { title: 'Mutaciones', route: 'properties' },
  ]);

  // public menuItems: MenuItem[] = [
  //   { title: 'Contador', route: 'counter' },
  //   { title: 'Usuario', route: 'user-info' },
  //   { title: 'Mutaciones', route: 'properties' },
  // ];
}
