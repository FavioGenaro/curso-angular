import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient ) { }

    // regresa un arreglo de paises, pero luego se refactorizará para un solo país
    // retornaremos un solo país o un null
    searchCountryAlphaCode(code:string): Observable<Country | null>{
        const url = `${ this.apiUrl }/alpha/${ code }`;

        return this.http.get<Country[]>( url ) 
            .pipe( 
                map(countries => countries.length > 0 ? countries[0]: null), // retornamos un solo país
                catchError( () => of(null) )
            );
    }

    // Método para realizar la busqueda por copital
    // Retorna un Observable, porque el método http.get retorna uno. Es muy parecido a una promesa. Retorna un arreglo de Country
    searchCapital( term: string ): Observable<Country[]> {

        const url = `${ this.apiUrl }/capital/${ term }`; // url para la petición

        // al get tmb debemos colocarle el tipo de dato que retornará
        // para que la petición se realice debemos hacer el subscribe, debemos suscribirnos para disparar la petición
        return this.http.get<Country[]>( url ) 
            .pipe( // pipe permite especificar operadores de rxjs como map, tab o catchError
                catchError( () => of([]) ) // of permite construir un observable baso en el argumento que mandamos
                // si hay error, retorna un observable con arreglo vacio
            );
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`;
        return this.http.get<Country[]>( url ) 
            .pipe(
                catchError( () => of([]) )
            );
    }

    // Continentes
    searchRegion( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ term }`;
        return this.http.get<Country[]>( url ) 
            .pipe(
                catchError( () => of([]) )
            );
    }

}