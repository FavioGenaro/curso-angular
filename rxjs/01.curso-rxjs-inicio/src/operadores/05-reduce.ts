import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';


const numbers = [1,2,3,4,5];

const totalReducer = ( acumulador: number, valorActual: number ) => {
    return acumulador + valorActual; // nuevo valor acumulado
}

// el metodo reduce toma un acumulador y un valor actual, y devuelve un nuevo valor acumulado.
// este es un metodo de los arrays de javascript, que se usa para reducir un array a un solo valor.
const total = numbers.reduce( totalReducer, 0 );
console.log('total arr', total );


// Reduce es un operador que toma un acumulador y un valor actual, y devuelve un nuevo valor acumulado.
// en este ejemplo, se usa para sumar los valores de un observable que emite valores cada 500ms. 
// interval emite un valor cada 500ms, y el operador take toma los primeros 6 valores del observable.
interval(500).pipe(
    take(6),
    tap( console.log ),
    reduce( totalReducer )
)
.subscribe({
    next: val => console.log('next:', val ),
    complete: () => console.log('Complete')
});





