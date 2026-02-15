import { of, from } from 'rxjs';
import { distinct } from 'rxjs/operators';


// <number|string>
const numeros$ = of(1,'1',1,3,3,2,2,4,4,5,3,1, '1' );

numeros$.pipe(
    // distinct permite eliminar elementos repetidos, pero compara por referencia, no por valor
    distinct() // compara por referencia, no por valor, es decir, usa ===
).subscribe( console.log );

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
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
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    },
];

from( personajes ).pipe(
    // para objetos necesitamos pasar una función de comparación, en este caso, queremos comparar por el nombre del personaje
    // porque los objetos son diferentes por referencia, aunque tengan el mismo nombre, entonces necesitamos comparar la propiedad directamente
    distinct( p => p.nombre )
).subscribe( console.log );



