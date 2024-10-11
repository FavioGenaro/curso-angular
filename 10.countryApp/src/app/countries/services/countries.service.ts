import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    public cacheStore: CacheStore = {
        byCapital:   { term: '', countries: [] }, // guardamos el termino de busqueda y el arreglo de countries
        byCountries: { term: '', countries: [] },
        byRegion:    { region: '', countries: [] },
    }

    constructor(private http: HttpClient ) {
        this.loadFromLocalStorage(); // se ejecuta cuando se inicializa el servicio, no usamos el ngOnInit porque este service no es un componente
    }

    // guardamos en el localstorage
    private saveToLocalStorage() {
        localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
    }
    // cargamos los valores desde localstorage
    private loadFromLocalStorage() {
        if ( !localStorage.getItem('cacheStore') ) return;

        this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
    }


    // Metodo que realiza peticiones a una url y retorna un Country[]
    private getCountriesRequest( url: string ): Observable<Country[]> {
        return this.http.get<Country[]>( url )
            .pipe( // pipe recibe varios operadores RxJS que necesitemos
                catchError( () => of([]) ),
                // delay( 2000 ), // agregamos un tiempo adicional para agregar un loading
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
            .pipe(
                // cuando venga un nuevo mensaje del observable permite ejecutar funciones sin afectar el valor retornado del observable
                tap(countries => this.cacheStore.byCapital = { term, countries }), // guardamos los datos
                tap( () => this.saveToLocalStorage() ),
            )
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCountries= { term, countries }),
            tap( () => this.saveToLocalStorage() ),
        )
    }

    // Continentes
    searchRegion( region: Region): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ region }`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byRegion = { region, countries }),
            tap( () => this.saveToLocalStorage() ),
        )
    }

}