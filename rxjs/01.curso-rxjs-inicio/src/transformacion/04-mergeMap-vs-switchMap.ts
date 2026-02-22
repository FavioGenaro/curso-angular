import { fromEvent, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';



const click$    = fromEvent( document, 'click' ); // source
const interval$ = interval(1000);


click$.pipe(
    switchMap( () => interval$ ), // switchMap cancela la petición anterior y hace una nueva
    // mergeMap( () => interval$ ), // mergeMap no cancela la petición anterior, hace una nueva sin importar si la anterior terminó o no
).subscribe( console.log );


