import { Component, effect, input, output } from '@angular/core';
import { Product } from '../../../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  // @Input({
  //   required: true,
  // })
  // public product!: Product;
  // Esta es la nueva forma de usar el input, este es una señal
  public product = input.required<Product>();

  // @Output()
  // public onIncrementQuantity = new EventEmitter<number>();
  //Para la forma del output
  public onIncrementQuantity = output<number>();

  // método para emitir el valor, este se activa al hacer click en el boton
  public incrementQuantity(): void {
    this.onIncrementQuantity.emit(this.product().quantity + 1);
  }
  // disparamos un efecto, que emite el valor del producto
  public loginEffect = effect(() => {
    console.log(this.product().name);
  });
}
