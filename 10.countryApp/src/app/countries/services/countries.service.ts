import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient ) { }

    // Metodo que realiza peticiones a una url y retorna un Country[]
    private getCountriesRequest( url: string ): Observable<Country[]> {
        return this.http.get<Country[]>( url )
            .pipe( // pipe recibe varios operadores RxJS que necesitemos
                catchError( () => of([]) ),
                delay( 2000 ), // agregamos un tiempo adicional para agregar un loading
            );
    }


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
        return this.getCountriesRequest(url)
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`;
        return this.getCountriesRequest(url)
    }

    // Continentes
    searchRegion( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ term }`;
        return this.getCountriesRequest(url)
    }

}