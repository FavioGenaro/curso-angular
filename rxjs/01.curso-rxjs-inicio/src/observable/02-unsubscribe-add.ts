import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next : value => console.log('next:', value ),
    error: error => console.warn('error:', error ),
    complete: () => console.info('completado')
};

// observable que emite valores cada segundo (numeros)
// y se completa a los 2.5 segundos
// y se destruye el intervalo
const intervalo$ = new Observable<number>( subscriber => {

    // Crear un contador, 1,2,3,4,5,......
    let count = 0;

    const interval = setInterval( () => {
        // cada segundo
        count++;
        subscriber.next( count );
        // console.log(count);

    }, 1000);

    // completamos el observable a los 3 segundos
    // setTimeout(() => {
    //     subscriber.complete();
    // }, 3000 );

    // return, se ejecuta cuando se cancela la subscripción (unsubscribe())
    // También se ejecuta cuando se completa el observable
    return () => {
        clearInterval(interval);
        console.log('Intérvalo destruido');
    }

});

// el método subscribe retorna un tipo Subscription
// podemos guardar las subscripciones en una variable
// y luego podemos cancelar la subscripción con unsubscribe

const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );
const subs3 = intervalo$.subscribe( observer );

// el método add permite agregar una subscripción a otra subscripción
// esto permite cancelar varias subscripciones a la vez
// subs1.add( subs2 ).add( subs3 );



setTimeout(() => {
    // a los 6 segundos cancelamos la subscripción
    subs1.unsubscribe()
    subs2.unsubscribe()
    subs3.unsubscribe()

    // despues de 6 segundos, comienza la emisión de valores en esta subscripción
    // const subs2 = intervalo$.subscribe( observer );

    console.log('Completado timeout');
}, 6000);
