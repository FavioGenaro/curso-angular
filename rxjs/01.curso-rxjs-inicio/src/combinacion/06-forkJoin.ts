import { of, interval, forkJoin } from 'rxjs';
import { take, delay } from 'rxjs/operators';

// observables de ejemplo
const numeros$   = of(1,2,3,4);
const intervalo$ = interval(1000).pipe( take(3) ); //0..1..2 
const letras$    = of('a','b','c').pipe( delay(3500) );

// forkJoin espera a que todos los observables completen, y 
// luego emite un array con el último valor emitido por cada uno de ellos
// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe( console.log  )

// podemos desestructurar el resultado para obtener cada valor por separado
// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe( resp => {
//     console.log('numeros: ', resp[0] )
//     console.log('intérvalo: ', resp[1] )
//     console.log('letras: ', resp[2] )
// });

// forkJoin con alias (resp) para cada observable, el resultado es un objeto
// forkJoin({
//     numeros$,
//     intervalo$,
//     letras$
// }).subscribe( resp => {
//     console.log(resp)
// });

// fork join con alias para cada observable, el resultado es un objeto 
// con las propiedades num, int y let, cada una con el valor del último valor 
// emitido por su respectivo observable
forkJoin({
    num: numeros$,
    int: intervalo$,
    let: letras$
}).subscribe( resp => {
    console.log(resp)
});


