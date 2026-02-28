import { interval, map, take } from 'rxjs';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() =>{

    const inicio = 7;
    const countdown$ = interval(700).pipe(
        // Usar los operadores necesarios
        // para realizar la cuenta regresiva
        map( i => inicio - i ),
        take( inicio + 1 ) // para que se emita el 0, se debe de tomar una cantidad de valores igual a inicio + 1 (8)
    );
    

    // No tocar esta línea ==================
    countdown$.subscribe( console.log ); // =
    // ======================================


})();

		