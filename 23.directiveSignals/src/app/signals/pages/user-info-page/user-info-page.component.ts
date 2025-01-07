import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../interface/user-request.interface';
@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{
  private usersService = inject(UserServiceService); // inyectamos nuestro servicio
  public userId = signal(1); // signal para el valor del id

  public currentUser = signal<User|undefined>(undefined); // usuario que retorna el servicio
  public userWasFound = signal(true); // estado para el usuario

  // propiedad computada para el nombre
  public fullName = computed<string>( () => {
    // Retornamos un strign mientras no tengamos al usuario, en algun momento del tiempo no lo tendremos
    if ( !this.currentUser() ) return 'Usuario no encontrado';
    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`; // nombre completo
  });

  ngOnInit(): void {
    this.loadUser( this.userId() ) // cargamos el usuario 1
  }

  // Obtenemos el usuario mediante el servicio
  loadUser( id: number ) {
    if ( id <= 0 ) return;

    this.userId.set(id); // establecemos el valor del id
    this.currentUser.set(undefined); // limpiamos el usuario

    // Realizamos la petición
    this.usersService.getUserById( id )
      .subscribe({ // nos suscribimos al evento reactivo
        next: (user) => {
          this.currentUser.set( user ); // establecemos el valor del usuario
          this.userWasFound.set(true);
        },
        error: () => { // para manejar errores
          this.userWasFound.set(false); // se muestra el mensaja de error
          this.currentUser.set(undefined); // limpiamos el usuario
        },
      });
  }
}
