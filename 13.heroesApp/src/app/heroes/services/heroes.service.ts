import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

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


  // Agregamos un heroe, recibe los datos del heroe
  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero );
  }

  // actualizamos campos del heroe, retorna el heroe con las modificaciones
  updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero );
  }

  // eliminamos el heroe
  deleteHeroById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( err => of(false) ), // retorna un false en caso no se haya borrado el heroe, la petición falla
        map( resp => true ), // retorna un true, no importa la respuesta que regresa, porque no cayo en el catch
      );
  }
}
