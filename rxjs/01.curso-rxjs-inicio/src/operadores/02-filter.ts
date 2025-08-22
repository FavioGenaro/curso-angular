import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// filter, es un operador que filtra los valores emitidos por el observable
// en este caso, solo emitirá los valores impares del rango de 1 a 10.
// range(1,10).pipe(
//     filter( val => val % 2 === 1 )
// ).subscribe( console.log );

range(20,30).pipe(
    filter( (val, i) => {
        console.log('index', i);
        return val % 2 === 1;
    })
).subscribe( console.log );

interface Personaje {
    tipo: string;
    nombre: string;
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman'
    },
    {
        tipo: 'heroe',
        nombre: 'Robin'
    },
    {
        tipo: 'villano',
        nombre: 'Joker'
    },
];

// retornamos los personajes que no son héroes
from( personajes ).pipe(
    filter( p => p.tipo !== 'heroe' )
).subscribe( console.log );

// anidamiento de operadores
// en este caso usamos el map para obtener el código de la tecla presionada
// y luego usamos el filter para filtrar solo el código 'Enter'
const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' ).pipe(
    map( event => event.code ), // keyboardEvent, string
    filter( key => key === 'Enter' ),
);

keyup$.subscribe( console.log );


