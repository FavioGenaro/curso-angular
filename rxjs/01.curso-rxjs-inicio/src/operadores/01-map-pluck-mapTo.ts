import { range, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

range(1,5).pipe(
    // map, es el operador que transforma los valores emitidos
    // el tipado de map es primero el tipo de dato que va a recibir
    // y el segundo el tipo de dato que emite el observable transformado
    map<number,string>( val => (val * 10).toString() ) // si queremos hacer más operaciones debemos colocar un return
)
.subscribe( console.log ); // solo imprime los valores transformados, no realizamos la transformación aquí

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupCode$ = keyup$.pipe(
    map( event => event.code ) // solo retorna el código de la tecla presionada
);

// pluck, es un operador que extrae una propiedad de un objeto
// solo extraemos de la propiedad target, y de esa propiedad extraemos baseURI.
// puede extraer varias propiedades anidadas, pero tambien puede extraer solo una propiedad
const keyupPluck$ = keyup$.pipe(
    pluck('target', 'baseURI')
);

// mapTo, es un operador que transforma todos los valores emitidos a un valor constante
// en este caso, cada vez que se presione una tecla, se emitirá el valor 'Tecla presionada'
// no importa qué tecla se presione, siempre emitirá ese valor constante
const keyupMapTo$ = keyup$.pipe(
    mapTo('Tecla presionada')
);


// keyup$.subscribe( console.log );
keyupCode$.subscribe( code => console.log('map', code ) );
keyupPluck$.subscribe( code => console.log('pluck', code ) );
keyupMapTo$.subscribe( code => console.log('mapTo', code ) );

