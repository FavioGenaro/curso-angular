import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';


// evento click
const click$ = fromEvent<MouseEvent>( document, 'click');

// cada 2 segundos emite el último valor emitido por click$
// la diferencia entre sampleTime y debounceTime es que sampleTime emite el último valor emitido por click$ cada 2 segundos,
// mientras que debounceTime emite el último valor emitido por click$ después de 2 segundos de inactividad. 
// Es decir, debounceTime espera a que no haya más eventos durante 2 segundos antes de emitir el último valor, 
// mientras que sampleTime emite el último valor cada 2 segundos sin importar si hay eventos o no.
click$.pipe(
    sampleTime(2000), // se coloca el sampleTime antes del map para que no se procese el todos los click en el map y solo se proceso el ultimo
    map( ({ x, y }) => ({ x, y }) ),
).subscribe( console.log );
