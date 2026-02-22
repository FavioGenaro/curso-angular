import { of, interval, fromEvent } from 'rxjs';
import { mergeMap, take, map, takeUntil } from 'rxjs/operators';



const letras$ = of('a', 'b', 'c');

// se generar 3 intervalos por cada letra, cada intervalo emite un valor cada segundo, 
// el resultado es un observable que emite valores de los 3 intervalos a la vez
letras$.pipe(
    // mergeMap recibe un valor y retorna un observable, mergeMap se encarga de suscribirse 
    // a ese observable interno y emitir sus valores
    mergeMap( (letra) => interval(1000).pipe(
        map( i => letra + i ),
        take(3) // solo hace 3 emisiones por cada letra (0,1,2)
    ))
)
// .subscribe({
//     next: val => console.log('next:', val),
//     complete: () => console.log('Complete')
// });

// mouseDown detecta el inicio de un click,
// mouseUp detecta el final del click,
// mientras se mantiene el click se emite un valor cada segundo, 
// al soltar el click se detiene la emisión de valores
const mousedown$ = fromEvent( document, 'mousedown');
const mouseup$   = fromEvent( document, 'mouseup');
const interval$  = interval();

mousedown$.pipe(
    // mergeMap recibe el evento del mouseDown y retorna un observable, 
    // mergeMap se encarga de suscribirse.
    // takeUntil recibe un observable (mouseup$) y se encarga de completar el observable interno (interval$)
    mergeMap( () => interval$.pipe(
        takeUntil( mouseup$ )
    ))
)
.subscribe( console.log );