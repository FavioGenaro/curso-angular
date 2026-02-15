import { of, from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


// <number|string>
const numeros$ = of(1,'1',1,3,3,2,2,4,4,5,3,1, '1' );

// distinctUntilChanged permite emitir un valor solo si es diferente al valor anterior, es decir, 
// compara el valor actual con el valor anterior y solo emite el valor actual si es diferente. 
// Esto es útil para evitar emitir valores repetidos consecutivos.
numeros$.pipe(
    distinctUntilChanged()
).subscribe( console.log );

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Megaman' // dos megaman seguidos, el segundo no se emitirá
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
];

// distinctUntilChanged también puede recibir una función de comparación personalizada, 
// que permite comparar objetos complejos basados en una propiedad específica.
// En este caso, se compara la propiedad 'nombre' de los objetos Personaje para determinar si son iguales o no.
// la función de comparación personalizada toma dos argumentos: el valor anterior (ant) y el valor actual (act)
from( personajes ).pipe(
    distinctUntilChanged( (ant, act) => ant.nombre === act.nombre )
).subscribe( console.log );
