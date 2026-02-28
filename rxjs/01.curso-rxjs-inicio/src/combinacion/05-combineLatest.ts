import { fromEvent, combineLatest, from } from 'rxjs';
import { pluck } from 'rxjs/operators';

// const keyup$ = fromEvent( document, 'keyup');
// const click$ = fromEvent( document, 'click');

// // combineLatest permite combinar el ultimo valor de cada uno de los observables que le pasemos, 
// // cada vez que uno de ellos emita un nuevo valor, se emitira un nuevo valor con el ultimo valor 
// // de cada uno de los observables combinados.
// combineLatest( 
//     keyup$.pipe( pluck('type') ), 
//     click$.pipe( pluck('type') )
// ).subscribe( console.log );


// Ejemplo con formularios, combinamos el valor de dos inputs, 
// cada vez que uno de ellos emita un nuevo valor, se emitira 
// un nuevo valor con el ultimo valor de cada uno de los inputs.
const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = 'email@gmail.com';

input2.placeholder = '*********';
input2.type = 'password'

document.querySelector('body').append(input1, input2);


// Helper
// Creamos un helper para obtener el valor de un input, a partir de un evento keyup, y 
// pluckueando el valor del target del evento.
const getInputStream = ( elem: HTMLElement ) => 
    // escribe dentro del input se emitira un evento keyup, 
    // a partir del cual pluckuearemos el valor del target del evento,
    fromEvent<KeyboardEvent>( elem, 'keyup' )
    .pipe(
        pluck<KeyboardEvent,string>('target','value')
    );

// combinamos el valor de los dos inputs, cada vez que uno de ellos emita un nuevo valor, 
// se emitira un nuevo valor con el ultimo valor de cada uno de los inputs.
combineLatest(
    getInputStream( input1 ),
    getInputStream( input2 ),
).subscribe( console.log )
