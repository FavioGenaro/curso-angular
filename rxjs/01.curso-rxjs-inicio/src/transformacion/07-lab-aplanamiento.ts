import { fromEvent, of } from 'rxjs';
import { tap, map, mergeMap, pluck, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Helper
const peticionHttpLogin = ( userPass ) => 
    ajax.post('https://reqres.in/api/login?delay=1', userPass)
    .pipe(
        pluck('response', 'token'),
        catchError( err => of('xxx') )
    )

// creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass  = document.createElement('input');
const submitBtn  = document.createElement('button');

// pequeño login
// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append( inputEmail, inputPass, submitBtn );
document.querySelector('body').append( form );

// Streams
// enviamos la info del formulario a una petición HTTP
// exhaustMap espera a que la petición HTTP termine para procesar una nueva petición, 
// si llega una nueva petición mientras la primera no terminó, la va a ignorar. 
// Es decir, no va a cancelar la primera petición, pero tampoco va a procesar la nueva petición. 
// Esto es útil para evitar que se envíen múltiples peticiones al servidor si el usuario 
// hace clic varias veces en el botón de enviar antes de que la primera petición haya terminado.
const submitForm$ = fromEvent<Event>( form, 'submit' )
    .pipe(
        tap( ev => ev.preventDefault() ), // event.preventDefault() para evitar que el formulario se envíe de forma tradicional y recargue la página
        map( ev => ({
            email: ev.target[0].value,
            password: ev.target[1].value
        })),
        exhaustMap( peticionHttpLogin )
    );

// obtenmos el token de la respuesta de la petición HTTP
submitForm$.subscribe( token => {
    console.log(token);
})
