import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  // propiedad recibida por el padre
  @Input()
  public price:number = 0;

  public intervarl$?: Subscription; // Creamos una suscripcion, es un estandar colocar un $ para los observables


  ngOnInit(): void {
    console.log('Componente HIJO: ngOnInit');
    // Creamos un observable interval que emite valores cada cierto tiempo
    // con el subscribe ese observable se eejecuta y recibimos sus valores. Almacenamos la suscripcion
    this.intervarl$ = interval(1000).subscribe( value => console.log(`Tick: ${value}`) );
  }

  // Imprimimos los cambios
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Componente HIJO: ngOnChanges');
    console.log({changes});
  }
  ngOnDestroy(): void {
    console.log('Componente HIJO: ngOnDestroy');
    // Aqui limpiamos la suscripción
    // tambien podemos eliminar los listener que vayamos creando
    this.intervarl$?.unsubscribe();
  }
}
