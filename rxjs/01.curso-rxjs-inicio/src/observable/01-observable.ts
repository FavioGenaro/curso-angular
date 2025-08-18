import { Observable, Observer } from 'rxjs';




// colocamos el simbolo de $ para indicar que es un observable

// const obs$ = Observable.create(); // forma de crear un observable (obsoleto)
const obs$ = new Observable<string>( subs => { // observable con generics, este emite un string

    // subs es un subject que emite valores, permite crear subscripciones
    // next es el metodo que emite valores a los suscriptores
    // solo podemos emitir valores string porque hemos definido el tipo de observable como string
    subs.next('Hola');
    subs.next('Mundo');

    subs.next('Hola');
    subs.next('Mundo');

    // Forzar un error, este debe ser error de js
    const a = undefined;
    a.nombre = 'Fernando';

    // complete: indica que el observable ha terminado de emitir valores
    subs.complete();

    // ningun valor se emite despues de complete
    subs.next('Hola');
    subs.next('Mundo');

});

// obtenemos las respuestas del observable
// res es la respuesta que emite el observable
obs$.subscribe( res => {
    // esta funcion procesa el next del subscriber, esta función es un subscriber
    console.log(res);


} );

// forma abreviada de suscribirse al observable
// obs$.subscribe(console.log);
console.log('-----------------');

obs$.subscribe(
    valor => console.log('next: ', valor), // ejecuta el next del observer
    error => console.warn('error: ', error), // ejecuta el error del observer, antes del complete
    () => console.info('Completado') // ejecuta el complete del observer (es como el final de un try-catch-finally en JavaScript)
);


console.log('-----------------');
// Tambien podemos definir un observer
// any seria un string para este caso
const observer: Observer<any> = {
    // definimos las funciones que va a tener el observer, son las mismas que las del subscribe
    next : value => console.log('siguiente [next]:', value ),
    error: error => console.warn('error [obs]:', error ),
    complete: () => console.info('completado [obs]')
};

obs$.subscribe( observer );