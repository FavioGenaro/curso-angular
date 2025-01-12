import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TitleComponent],
  template: `
    <!-- Cambiamos el titulo por una señal -->
    <app-title [title]="titleLabel()" />

    @if( user() ) {
      <section>
        <!-- Mostramos información -->
        <!-- debemos colocar ! o ? porque no se detecta que el user() es sí ya existe al pasar por el if -->
        <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

        <div>
          <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
          <p>{{ user()?.email }}</p>
        </div>
      </section>
    } @else {
    <p>Cargando información</p>
    }
  `,
})
export default class UserComponent {

  private route = inject(ActivatedRoute); // con esto podemos obtener datos de la url, los params son observables
  private usersService = inject(UsersService);

  // normalmente al realizar la suscripcion al observable de la peticion http, nos 
  // public user = signal<User| undefined>(undefined);
  // toSignal: convierte un observable en una señal
  public user = toSignal(
    this.route.params.pipe(
      // retornamos los datos del usuario, esto como uan señal
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      // Concatenamos el nombre y apellido
      return `Información del usuario: ${this.user()?.first_name} ${this.user()?.last_name}`;
    }
    // Si no tenemos la info aún, retornamos este titulo
    return 'Información del usuario';
  });

}
