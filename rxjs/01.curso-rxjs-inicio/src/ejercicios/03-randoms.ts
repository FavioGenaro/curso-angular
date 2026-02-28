import { interval, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
/**
 * Ejercicio: Realizar que los dos observables finales, 
 * emitan exactamente el mismo valor
 * 
 * Tip: Hot Observable? subjects?
 */

(() =>{

  // == NO TOCAR este bloque ====================
  const reloj$ = interval(1000).pipe(
    take(5),
    map( val => Math.round(Math.random() * 100) )
  );
  // No tocar la creación del observable
  // ============================================

  // subject permite que un observable sea compartido entre varios observadores, es decir, 
  // que emita el mismo valor a todos los observadores que se suscriban a él.
  const subject = new Subject();

  // Suscribimos el subject al observable reloj$
  reloj$.subscribe( subject );

  
  // Estos dos observables deben de emitir exactamente los mismos valores
  subject.subscribe( val => console.log('obs1', val) );
  subject.subscribe( val => console.log('obs2', val) );



})();
