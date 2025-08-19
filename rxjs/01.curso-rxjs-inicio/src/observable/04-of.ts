import { of } from 'rxjs';


// se debe tipar el observable si recibimos un mismo tipo de dato
// const obs1$ = of<number>(1,2,3,4,5,6); // <number>
// const obs$ = of(...[1, 2, 3], 4, 5, 6, 2, 3, 4, 5);

// si recibimos distintos tipos de datos, se puede tipar como 'any'
const obs$ = of( [1,2], {a:1, b:2}, function(){}, true, Promise.resolve(true) );


// si fuera asincrono 'Inicio del Obs$' y 'Fin del Obs$' se ejecutarian antes que el subscribe
console.log('Inicio del Obs$');
obs$.subscribe( 
    next => console.log('next', next ),
    null, // para manejar errores
    () => console.log('Terminamos la secuencia')
);
console.log('Fin del Obs$');





