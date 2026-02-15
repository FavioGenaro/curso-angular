import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, pluck, distinctUntilChanged } from 'rxjs/operators';


const click$ = fromEvent( document, 'click' );

click$.pipe(
    throttleTime(3000)
)//.subscribe( console.log );

// Ejemplo 2
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' );

// en este caso se va a emitir el valor del input cada 400ms, pero solo el último valor, es decir, 
// el que se emitió al finalizar los 400ms, no el primero ni los intermedios (comportamiento parecido a debounceTime), 
// pero a diferencia de debounceTime, throttleTime emite el primer valor y luego ignora los siguientes valores hasta que pasen los 400ms, 
// mientras que debounceTime ignora el primer valor y luego emite el último valor después de 400ms sin emitir ningún valor intermedio
input$.pipe(
    throttleTime(400, asyncScheduler, {
        leading: false, // no emite el primer valor
        trailing: true // emite el último valor al finalizar los 400ms
    }),
    pluck('target','value'),
    distinctUntilChanged()
).subscribe( console.log );
