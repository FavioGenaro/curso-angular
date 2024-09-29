import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient ) { }

    // Método para realizar la busqueda por copital
    // Retorna un Observable, porque el método http.get retorna uno. Es muy parecido a una promesa. Retorna un arreglo de Country
    searchCapital( term: string ): Observable<Country[]> {

        const url = `${ this.apiUrl }/capital/${ term }`; // url para la petición

        // al get tmb debemos colocarle el tipo de dato que retornará
        // para que la petición se realice debemos hacer el subscribe, debemos suscribirnos para disparar la petición
        return this.http.get<Country[]>( url ) 
            .pipe(
                catchError( () => of([]) )
            );
    }
}