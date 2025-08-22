import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';



const numeros$ = range(1,5);

// tab es un operador que permite realizar acciones secundarias en el flujo de datos sin alterar los valores emitidos por el observable.
// Es útil para depurar, registrar o realizar efectos secundarios sin modificar los datos.
// Se puede usar para imprimir valores, realizar cálculos o ejecutar funciones sin afectar el flujo principal

numeros$.pipe(
    tap( x => {
        console.log('antes', x);
        return 100;
    }),
    map( val => val * 10 ),
    tap({
        next: valor => console.log('después', valor),
        complete: () => console.log('Se terminó todo')
    })
)
.subscribe( val => console.log('subs', val ));






