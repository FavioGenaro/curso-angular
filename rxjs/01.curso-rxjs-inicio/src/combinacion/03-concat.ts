import { interval, concat, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

// concatMap es el operador obsoleto

const interval$ = interval(1000);

// concat permite concatenar observables, es decir, se suscribe a cada uno de ellos en orden y 
// espera a que el anterior complete antes de suscribirse al siguiente.
concat(
    interval$.pipe( take(3) ),
    interval$.pipe( take(2) ),
    of(1)
).subscribe( console.log  )


