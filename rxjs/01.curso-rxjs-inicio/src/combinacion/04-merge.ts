import { fromEvent, merge } from 'rxjs';
import { pluck } from 'rxjs/operators';


const keyup$ = fromEvent( document, 'keyup');
const click$ = fromEvent( document, 'click');

// merge permite combinar múltiples observables en uno solo, emitiendo los valores de cada uno a medida que se producen.
// el orden de las suscripciones no afecta el orden de emisión de los valores, 
// ya que merge emite los valores a medida que se producen en cada observable, 
// independientemente del orden en que se hayan suscrito.
merge( 
    keyup$.pipe( pluck('type') ), 
    click$.pipe( pluck('type') )
).subscribe( console.log );



