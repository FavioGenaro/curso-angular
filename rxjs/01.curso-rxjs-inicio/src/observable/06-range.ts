import { of, range, asyncScheduler } from 'rxjs';

// range es un operador de creación que permite crear un Observable que emite una secuencia de números en un rango específico.
// Este operador es útil para generar secuencias numéricas de manera reactiva.

// pueden ser asíncronas o síncronas
// para que sea asíncrono, se debe pasar el asyncScheduler como tercer argumento, esto hará que los valores se emitan de manera asíncrona

// const src$ = of(1,2,3,4,5);

// Ejemplo de uso de range para emitir números del -1 al 3 de manera asíncrona
// El primer argumento es el valor inicial, el segundo es la cantidad de valores a emitir
// Si se omite el tercer argumento, se utilizará el scheduler por defecto (syncScheduler)
// Si se pasa asyncScheduler, los valores se emitirán de manera asíncrona 
// range(5): emite los números del 0 al 4, por defecto el valor inicial es 0
const src$ = range(-1,5, asyncScheduler);


console.log('inicio');
src$.subscribe( console.log );
console.log('fin');


