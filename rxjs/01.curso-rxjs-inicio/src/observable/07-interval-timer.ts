import { interval, timer } from 'rxjs';

const observer = {
    next: val => console.log('next:', val),
    complete: () => console.log('complete'),
}

// interval y timer son asincronos por defecto

// el interval emite valores cada cierto tiempo, en este caso cada 1 segundo
// empiza emitiendo desde 0, 1, 2, 3, ... sin fin
// por más que coloquemos interval(0), se mostrará de forma asíncrona
const interval$ = interval(1000);

// el timer emite un valor después de un tiempo determinado, en este caso 2 segundos
// el primer argumento es el tiempo de espera, el segundo es el intervalo entre emisiones
// const timer$    = timer(2000); // Observable que emite un valor después de 2 segundos y se completa

// el timer también puede emitir valores periódicamente, en este caso cada 1 segundo después de los 2 segundos iniciales
// const timer$    = timer(2000, 1000 );

// el timer también puede emitir un valor en una fecha específica
// en este caso, se emite un valor en 5 segundos a partir de ahora
const hoyEn5 = new Date(); // ahora
hoyEn5.setSeconds( hoyEn5.getSeconds() + 5 );
const timer$    = timer( hoyEn5 );


console.log('Inicio');
// interval$.subscribe( observer );
timer$.subscribe( observer )
console.log('Fin');









