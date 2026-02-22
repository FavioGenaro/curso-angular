import { interval, fromEvent } from 'rxjs';
import { take, switchMap, concatMap } from 'rxjs/operators';

const click$    = fromEvent( document, 'click' ); // source que emite eventos click del documento
const interval$ = interval(500).pipe( take(3) ); // emite 0,1,2 cada 500ms, y se completa

// concatenar los intervalos, esperando a que el anterior se complete para iniciar el siguiente
click$.pipe(
    concatMap( () => interval$ )
)
.subscribe( console.log );