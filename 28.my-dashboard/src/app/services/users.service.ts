import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '../interfaces/req-response';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // para poder hacer una correcta importación el modulo http antes se importaba al modulo raíz
  // pero ahora estamos trabajando con standalone, así debemos importarlo en el app.config.ts
  private http = inject( HttpClient );

  // esta es una señal de tipo State. El # hace que la variable sea privada que sirve más que colocar private a la hora de hacer la traspilación
  #state = signal<State>({
    loading: true,
    users: [],
  });

  // Creamos una señal computada de solo lectura
  // esto lo hacemos para tener acceso a los valores de la señal #state, que es privado, además de brindarnos una capa de seguridad
  public users = computed( () => this.#state().users );
  public loading = computed( () => this.#state().loading );

  constructor() { 
    // console.log('Cargando data');
    this.http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe( delay(1500) ) // delay de 1.5 segundos
      .subscribe( res => {
        // asignamos el valor de la respuesta a la señal
        this.#state.set({
          loading: false,
          users: res.data,
        })
      });
  }

  // retornamos el observable que nos da la información del usuario.
  getUserById( id: string ) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${ id }`)
      .pipe(
        delay(1500),
        map( resp => resp.data )
      )
  }
}
