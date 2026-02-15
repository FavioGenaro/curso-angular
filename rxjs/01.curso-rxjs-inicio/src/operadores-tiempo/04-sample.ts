import { interval, fromEvent } from 'rxjs';
import { sample } from 'rxjs/operators';

// interval$: emite un valor cada 500ms
// click$: emite un valor cada vez que se hace click en el documento
const interval$ = interval(500);
const click$    = fromEvent( document, 'click' );


// Cada vez que se hace click, se emite el último valor emitido por interval$
interval$.pipe(
    sample(click$)
).subscribe( console.log );
