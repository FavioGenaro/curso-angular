import { fromEvent } from 'rxjs';

// fromEvent es un operador de creación que permite crear un Observable a partir de eventos del DOM. 
// Este operador es útil para manejar eventos como clicks, teclas presionadas, etc., de manera reactiva.

/**
 * Eventos del DOM
 */
// Ejemplo de uso de fromEvent para manejar eventos de click y keyup en el documento
const src1$ = fromEvent<MouseEvent>( document, 'click'); // Observable que emite eventos de clic del mouse
const src2$ = fromEvent<KeyboardEvent>( document, 'keyup'); // Observable que emite eventos de liberación de teclas del teclado

const observer = {
    next: val => console.log('next', val )
};

// con el tipado podemos acceder a las propiedades del evento directamente

// destructuración de MouseEvent para obtener las coordenadas del clic
src1$.subscribe( ({ x, y }) => {
    console.log(x,y);
});


src2$.subscribe( evento => {
    console.log( evento.key );
});





