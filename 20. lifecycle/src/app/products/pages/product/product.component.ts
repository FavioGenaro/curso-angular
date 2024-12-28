import { Component } from '@angular/core';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product-page',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public isProductVisible: boolean = false;
  public currentPrice: number = 10; // valor que le pasamos al hijo

  constructor() {
    console.log('Constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  // Podemos obtener los cambios, con recargar el componente esto no se verá
  // se dispara antes del cambio de una propiedad, pero esta propiedad debe usar el @Input que es pasado de un padre a hijo
  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes})
    console.log('ngOnChanges');
  }

  // se ejecuta al realiza un cambio
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  // cuando se realiza un cambio, se ejecuta despues de un cambio en el DOM
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }


  increasePrice() {
    this.currentPrice++; // modificamos la propiedad
  }


}
