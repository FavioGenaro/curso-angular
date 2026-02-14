import { fromEvent } from 'rxjs';
import { take, first, tap, map } from 'rxjs/operators';

// escuchamos el click dentro del html
// emite el evento MouseEvent
const click$ = fromEvent<MouseEvent>( document, 'click' );



click$.pipe(
    tap<MouseEvent>( console.log ),
    // map( event => ({
    //     clientY: event.clientY,
    //     clientX: event.clientX
    // }) )
    // emitimos un objeto con las posiciones del click
    map( ({ clientX, clientY }) => ({ clientY,clientX }) ),
    // con take no podemos agregar este tipo de condiciones
    // cuando se cumpla por primera vez, dejara de escuchar el evento
    first( event => event.clientY >= 150 )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});





