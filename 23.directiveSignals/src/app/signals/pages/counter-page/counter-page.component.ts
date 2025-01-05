import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  // señal que contiene un valor númerico
  // antes lo trabajamos con el valor directamente sin señales, pero eso hacia que se reconstruya el componente y pase por
  // su ciclo de vida, con las señales nos ahorramos esto.
  public counter = signal(10);

  // computed crea una señal computada de solo lectura
  // esto es una señal que retorna el valor en base a una función, si adentro hay otras señales, sus cambios serán detectados y
  // se actualizará esta señal computada de igual forma, solo ahí se actualiza esta señal computado y de igual forma se actualiza en todos lados
  // Al ser solo de lectura no podemos usar el .update, .set, etc. solo es de lectura
  public squareCounter = computed( () => this.counter() * this.counter() );

  // Incrementa el valor en base a un número (value)
  increaseBy( value: number ) {
    // para incrementar el valor podemos usar el set(this.counter() + value)
    // lo mejor es usar update, que tiene valor actual de la señal (current) y retorna el nuevo valor de la señal
    this.counter.update( current => current + value );

  }
}
