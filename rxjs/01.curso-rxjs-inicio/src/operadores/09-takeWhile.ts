import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';



const click$ = fromEvent<MouseEvent>( document, 'click' );


click$.pipe(
    map( ({ x, y }) => ({x,y}) ),
    // takeWhile( ({ y })=> y <= 150 )
    // recibe los valores mientras la condición se cumpla
    // con true, permite retornar el ultimo valor que rompe la condición y finalmente finaliza la suscripción
    takeWhile( ({ y })=> y <= 150, true )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete'),
});







