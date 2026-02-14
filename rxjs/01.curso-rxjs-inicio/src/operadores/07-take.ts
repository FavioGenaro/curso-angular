import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// of para una lista de valores a emitir.
const numeros$ = of(1,2,3,4,5).pipe(tap( console.log ));


numeros$.pipe(
    tap( t => console.log('tap', t) ),
    take(3) // cancela la emisión del observable hasta llegar al limite
)
// cuando ejecutamos la suscripción el take de igual forma se aplica a los pipes anteriores.
.subscribe({
    next: val => console.log('next:' , val),
    complete: () => console.log('complete'),
});





