import { interval, fromEvent } from 'rxjs';
import { takeUntil, skip, tap } from 'rxjs/operators';

// creamos un boton
const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';

document.querySelector('body').append( boton ); // insertamos el boton

// creamos un observable que emite cada segundo
const counter$  = interval(1000);

// const clickBtn$ = fromEvent( boton, 'click' );

// skip(1) va a ignorar el primer click, y takeUntil se va a suscribir al click del boton, 
// y va a emitir los valores del counter$ hasta que se haga click en el boton,
const clickBtn$ = fromEvent( boton, 'click' ).pipe(
    // tap antes de skip, se va a ejecutar antes de que skip ignore el primer click
    // el tap después de skip, se va a ejecutar después de que skip ignore el primer click, 
    // por lo tanto solo se va a ejecutar a partir del segundo click
    tap( () => console.log('tap antes de skip') ),
    skip(1), // ingora el primer click, y solo a partir del segundo click
    tap( () => console.log('tap después de skip') ),
)

// takeUntil se va a suscribir al click del boton, y va a emitir los valores del counter$ hasta que se haga click en el boton

// takeUntil se va a suscribir al click del boton,
// pero solo a partir del segundo click, el primero lo va a ignorar por el skip(1)
counter$.pipe(
    takeUntil( clickBtn$ )
).subscribe({
        next: val => console.log('next', val),
        complete: () => console.log('complete')
});
