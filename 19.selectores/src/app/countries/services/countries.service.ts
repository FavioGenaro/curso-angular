import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1'; // API

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];

  constructor(
    private http: HttpClient 
    // para usarlo debemos importar el HttpClientModule en el appModule, porque este servicio esta proveido en root
  ) { }

  // retornamos el arrelo de regiones (continentes)
  get regions(): Region[] {
    return [ ...this._regions ]; 
    // usamos sprit, para que no retorna el mismo objeto, sino que retorna uno creado desde cero
    // de forma que si se modifica algo usando el get, aun tengmos el _regions original
  }

  // SmallCountry fue creado solo para obtener información necesaria sobre los paises
  // Observable que emite un SmallCountry[]
  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {

  //   return [];
  // }
    if ( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;
    // hacemos la petición http, retorna un Country[]
    return this.http.get<Country[]>(url)
      .pipe(
        // tap (response => console.log(response))
        // recibimos la respuesta y solo seleccionamos los valores que necesitamos
        map( countries => countries.map( country => ({ // retornamos un objeto SmallCountry por cada interación que hace el map
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))),
      )
  }

  getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
    // realizamos la petición en base al alphaCode
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>( url )
      .pipe(
        // la petición retorna un Country, nosotros debemos mapear y retornar un SmallCountry
        map( country => ({ // obtenemos los datos especificos del país
          name: country.name.common,
          cca3: country.cca3, 
          borders: country.borders ?? [],
        }))
      )
  }

  // Procesamos un arreglo de Alpha code para obtener los datos de cada país
  getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequests:Observable<SmallCountry>[]  = []; // retorna arreglo de observables vacio

    borders.forEach( code => {
      // usamos el método getCountryByAlphaCode par obtener la info de cada paíz
      const request = this.getCountryByAlphaCode( code );
      countriesRequests.push( request ); // se añade un observable
    });

    // emite un observable hasta que todos los observables del arreglo countriesRequests emitan un valor
    // espera para que pueda emitirlos todos juntos
    return combineLatest( countriesRequests );
  }

}
