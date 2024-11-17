import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // obtenemos la base de la url del backend de las variables de entorno
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { } // inyectamos el http

  // retorna un Observable que retorna un Hero[]
  getHeroes():Observable<Hero[]> {
    // Petición get a nuetra API
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  // obtener heroe por id, puede retorna un Hero o undefined si el heroe no existe
  getHeroById( id: string ): Observable<Hero|undefined> {
    // petición get al back
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        // Capturamos un error en la petición, este puede ser un 404 en caso no encuentre la heroe
        catchError( error => of(undefined) ) // of crea un observable según el valor entre (), un observable que retorna un undefined
      );
  }

  // autocmplete, para obtener los valores buscados por el usuario
  getSuggestions( query: string ): Observable<Hero[]> {
    // petición get, que retorna un arreglo de heroes, un arreglo vacio tmb se considera un arreglo de heroes
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

}
