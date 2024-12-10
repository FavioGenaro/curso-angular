import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User; // usuario puede ser nulo

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined; // si no existe el usuario
    return structuredClone( this.user ); // structuredClone es de JS y realiza un clone de la variable u objeto
  }

  // para la pagina de login
  login( email: string, password: string ):Observable<User> {
    // http.post('login',{ email, password }); // aún no hacemos validaciones, trabajaremos con el único usuario
    return this.http.get<User>(`${ this.baseUrl }/users/1`) // traemos el usuario de id 1.
      .pipe(
        tap( user => this.user = user ), // asignamos el valor obtenido al user y este valor se retornar al sgt tap
        // user.id.toString()
        tap( user => localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k' )), // guardamos en el localstorage, debería ser el token pero provisionalmente guardamos el id
      );
  }

  // revisa la sesión en el localstorage
  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token'); // obtenemos el token

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        // asignamos el usuario, se debería verificar que existe
        tap( user => this.user = user ),
        map( user => !!user ), // el ! indica que no hay valor y retorna false y el !! niega el false, así que retorna true.
        catchError( err => of(false) ) // en caso el user 1 no exista o por cualquier otro error, retorna false.
      );
  }

  // cerrar sesión
  logout() {
    this.user = undefined; // limpiamos el user
    localStorage.clear(); // limipiamos el localstorage
  }
}
