import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

// Ejemplo 1
// escuchamos los clicks del mouse, pero solo nos interesa el ultimo click despues de 3 segundos sin hacer click
const click$ = fromEvent( document, 'click' );

click$.pipe(
    debounceTime(3000)
);//.subscribe( console.log );


// Ejemplo 2
// escuchamos los eventos de teclado, pero solo nos interesa el ultimo valor despues de 1 segundo sin escribir nada
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' ); // escuchamos los eventos de teclado

// pluck nos permite extraer una propiedad de un objeto, en este caso el valor del input
// distinctUntilChanged nos permite emitir un valor solo si es diferente al anterior, 
// en este caso si el valor del input es diferente al anterior

// podemos usar este para evitar emitir valores repetidos, por ejemplo si el usuario escribe "hola" y 
// luego borra una letra y vuelve a escribirla, no queremos emitir "hola" dos veces
// en caso el input haga un petición a un servidor, esto nos permite evitar hacer peticiones innecesarias, 
// por ejemplo si el usuario escribe "hola" y luego borra una letra y vuelve a escribirla, no queremos hacer dos peticiones al servidor para obtener el mismo resultado
input$.pipe(
    debounceTime(1000),
    pluck('target','value'),
    distinctUntilChanged()
).subscribe( console.log );
