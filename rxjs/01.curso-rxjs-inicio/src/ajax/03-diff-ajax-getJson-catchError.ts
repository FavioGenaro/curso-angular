import { of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

const url = 'https://httpbinxx.org/delay/1';
// const url = 'https://api.github.com/users?per_page=5';

// retornamos el mismo error, pero con ajax.getJSON el error se propaga a la subscripción, 
// mientras que con ajax lo manejamos con catchError y devolvemos un observable con un objeto,
//  lo que hace que la subscripción reciba ese objeto en lugar del error.
const manejaError = ( resp: AjaxError ) => {
    console.warn('error:', resp.message );
    return of({
        ok: false,
        usuarios: []
    });
}

// la diferencia entre ambos es que el primero maneja el error y devuelve un observable con un objeto, 
// mientras que el segundo no maneja el error y lo propaga a la subscripción, 
// lo que hace que se ejecute el bloque de error en la subscripción.

// const obs$  = ajax.getJSON( url ).pipe(
//     catchError( manejaError )
// );
// const obs2$ = ajax( url ).pipe(
//     catchError( manejaError )
// );

const obs$  = ajax.getJSON( url );
const obs2$ = ajax( url ); // no usamos catchError.

// obs2$.subscribe( data => console.log('ajax:', data ));
obs$.pipe(
    catchError( manejaError )
)
.subscribe({
    next: val => console.log('next:', val),
    error: err => console.warn('error en subs:', err ),
    complete: () => console.log('complete'),
});


