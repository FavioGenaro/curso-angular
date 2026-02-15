import { fromEvent } from 'rxjs';
import { auditTime, tap, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click');

// auditTime emite el último valor emitido por el observable fuente en el momento que se cumpla el tiempo determinado, 
// siempre y cuando haya habido al menos una emisión. Si no ha habido ninguna emisión, no se emitirá ningún valor. 
// Es decir, auditTime espera a que transcurra un período de tiempo específico después de la última emisión del 
// observable fuente y luego emite el último valor emitido durante ese período, si es que hubo alguna emisión.
click$.pipe(
    map( ({ x }) => x ), // extraemos la coordenada x del evento de clic
    tap(val => console.log('tap', val) ), // mostramos el valor antes de aplicar auditTime
    auditTime(5000)
).subscribe( console.log );


