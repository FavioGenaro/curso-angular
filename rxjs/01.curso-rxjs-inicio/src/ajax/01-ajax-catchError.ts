import { ajax, AjaxError } from 'rxjs/ajax';
import { map, pluck, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const url = 'https://api.github.com/userdgss?per_page=5';

// metodo para manejar errores, el cual se puede usar tanto en fetch como en ajax, 
// ya que ambos retornan un objeto de tipo Response
const manejaErrores = ( response: Response ) => {

    if ( !response.ok ) {
        throw new Error( response.statusText );
    }
    
    return response;
}

// metodo para atrapar errores, el cual se puede usar tanto en fetch como en ajax,
// En este caso se retorna un observable de un array vacío, para que el observable no se complete con error, 
// sino que se complete con un valor por defecto
const atrapaError = (err: AjaxError) => {
    console.warn('error en:', err.message );
    return of([]);
}


// fetch retorna una promesa, la cual se resuelve con un objeto de tipo Response
// const fetchPromesa = fetch( url );

// fetchPromesa
//     // .then( data => console.log(data) ) // Response, dentro esta el body, pero no se puede acceder directamente
//     .then( resp => resp.json() ) // el método json() retorna una promesa, la cual se resuelve con el body ya parseado
//     .then( data => console.log('data:', data) ) // data es el body ya parseado
//     .catch( err => console.warn('error en usuarios', err ) )

// fetchPromesa
//     .then( manejaErrores )
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn('error en usuarios', err ) )

// ajax retorna un observable, el cual se resuelve con un objeto de tipo AjaxResponse
// la respuesta de ajax ya viene parseada, por lo que no es necesario usar el método json()
ajax( url ).pipe(
    pluck('response'), // pluck es un operador que extrae una propiedad de un objeto, en este caso la propiedad response del objeto AjaxResponse
    catchError( atrapaError ) // catchError es un operador que atrapa errores en el observable, y permite retornar un nuevo observable, en este caso un observable de un array vacío
)
.subscribe( users => console.log('usuarios:', users) );


