import { from } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';


const numeros = [1,2,3,4,5];

// const totalAcumulador = (acc, cur) => {
//     return acc + cur;
// }
const totalAcumulador = (acc, cur) => acc + cur;

// Reduce, emite directamente el valor acumulado final, mientras que Scan emite el valor acumulado en cada iteración.
from( numeros ).pipe(
    reduce( totalAcumulador, 0 )
)
.subscribe( console.log );

// Scan, emite el valor acumulado en cada iteración.
from( numeros ).pipe(
    scan( totalAcumulador, 0 )
)
.subscribe( console.log );

// scan sienta las bases para implementar un store en Redux, ya que permite acumular el estado de una aplicación a lo largo del tiempo.
// Redux
interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

const user: Usuario[] = [
    // este arreglo emula el estado de un usuario a lo largo del tiempo.
    // el usuario fher empieza sin autenticación, luego se autentica y finalmente se le asigna un token.
    { id: 'fher', autenticado: false, token: null },
    { id: 'fher', autenticado: true, token: 'ABC' },
    { id: 'fher', autenticado: true, token: 'ABC123' },
];

// este ejemplo muestra como se puede usar scan para acumular el estado de un usuario a lo largo del tiempo.
// el operador scan toma un acumulador y un valor actual, y devuelve un nuevo valor acumulado.
// en este caso, el acumulador es un objeto Usuario, y el valor actual es un objeto Usuario que se va acumulando en el estado.

// const state$ = from( user ).pipe(
//     scan<Usuario>( (acc, cur) => {
//         return { ...acc, ...cur } // actualiza el estado con el nuevo valor sobreescribiendolo
//     }, { edad: 33 })
// );

// const id$ = state$.pipe(
//     map( state => state.id )
// );

// id$.subscribe( console.log );


