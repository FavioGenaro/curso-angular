import { of } from 'rxjs';
import { startWith, endWith } from 'rxjs/operators';



const numeros$ = of(1,2,3).pipe(
    startWith('a','b','c'), // startWith se ejecuta al iniciar la secuencia, es decir, antes de emitir el 1, se emiten 'a','b','c'
    endWith('x','y','z'), // endsWith se ejecuta al finalizar la secuencia, es decir, después de emitir el 3, se emiten 'x','y','z'
);


numeros$.subscribe( console.log );



