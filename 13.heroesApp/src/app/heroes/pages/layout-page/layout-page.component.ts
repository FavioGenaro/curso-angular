import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  // Definimos las opciones del menú y la ruta
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // obtenemos el usuario logeado
  get user():User | undefined {
    return this.authService.currentUser; // puede ser User o undefined
  }
  // cerramos la sesión
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']) // retorna al login
  }
}
