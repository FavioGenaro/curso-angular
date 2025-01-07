import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SingleUserReponse, User } from '../interface/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http = inject( HttpClient ); // inyección de dependencias
  private baseUrl = 'https://reqres.in/api/users';

  constructor() { }

  getUserById( id: number ): Observable<User> {
    // Obtenemos los datos del usuario en base a su id
    return this.http.get<SingleUserReponse>(`${ this.baseUrl }/${ id }`)
      .pipe(
        map( response => response.data ),
        tap( console.log ), // imprimos el dato
      );

  }
}
