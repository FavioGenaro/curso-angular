import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Megaman'
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
    {
        nombre: 'Megaman' // este valor se emitirá porque el valor anterior es 'Zero', aunque ya se haya emitido antes, no es el mismo valor que el anterior.
    },
];

// distinctUntilKeyChanged permite comparar objetos por una propiedad en particular, y emitir solo cuando esa propiedad cambia.
// solo emitirá el primer objeto, y luego emitirá un nuevo objeto solo cuando la propiedad 'nombre' cambie.
from( personajes ).pipe(
    distinctUntilKeyChanged('nombre')
).subscribe( console.log );



