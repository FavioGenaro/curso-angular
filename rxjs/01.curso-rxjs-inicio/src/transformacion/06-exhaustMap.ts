import { interval, fromEvent } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';


const click$    = fromEvent( document, 'click' ); // source
const interval$ = interval(500).pipe( take(3) ); // emite un valor cada 500ms, pero solo toma los primeros 3 valores

// El operador exhaustMap se suscribe al observable interno solo si no hay una suscripción activa. 
// Si el usuario hace clic varias veces, solo se procesará el primer clic y 
// los siguientes serán ignorados hasta que el observable interno complete su emisión.
click$.pipe(
    exhaustMap( () => interval$ )
)
.subscribe( console.log );




