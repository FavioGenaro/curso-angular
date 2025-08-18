import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next : value => console.log('next:', value ),
    error: error => console.warn('error:', error ),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subs => {

    // intervalo que emite un numero aleatorio cada segundo
    const intervalID = setInterval( 
        () => subs.next( Math.random() ), 1000 
    );

    return () => {
        clearInterval( intervalID );
        console.log('Intervalo destruido')
    };

});

// subject es un tipo de observable que permite emitir valores a varios suscriptores

/**
 * 1- Casteo múltiple, muchos suscriptores van a recibir el mismo valor (distribuye los valores a todos los suscriptores)
 * 2- También es un observer
 * 3- Next, error y complete
 */

// el subject lo pasamos al subscribe del observable
// esto permite que el subject reciba los valores del observable
// y luego los distribuya a los suscriptores del subject
// el subject se comporta como un observable y un observer al mismo tiempo
const subject$ = new Subject();
const subscription = intervalo$.subscribe( subject$ );


// Queremos recibir los mismos valores random en cada subscripción y no valores diferentes

// const subs1 = intervalo$.subscribe( rnd => console.log('subs1', rnd) );
// const subs2 = intervalo$.subscribe( rnd => console.log('subs2', rnd) );

// Ahora nos suscribimos al subject
// const subs1 = subject$.subscribe( rnd => console.log('subs1', rnd) );
// const subs2 = subject$.subscribe( rnd => console.log('subs2', rnd) );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );


setTimeout( () => {

    // subject$ al ser un observer, podemos usar los métodos next, error y complete

    // emitimos el valor 10, todos los suscriptores recibirán el valor 10
    subject$.next(10);

    // completamos la subscription de subs1 y subs2, pero no la del subject$
    subject$.complete();

    // el set interval se detiene porque el unsubscribe del observable se ejecuta
    subscription.unsubscribe();

}, 3500 );

