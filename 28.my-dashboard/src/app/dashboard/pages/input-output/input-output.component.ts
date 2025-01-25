import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { ProductCardComponent } from './ui/product-card/product-card.component';
import { Product } from '../../../interfaces/product.interface';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [ ProductCardComponent ],
  templateUrl: './input-output.component.html',
  styles: `
    :host {
      display:block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InputOutputComponent implements OnDestroy {

  // lista de productos
  public products = signal<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Product 2',
      quantity: 0,
    },
  ]);

  // insertamos 7 productos, 1 producto por 1 segundo
  private intervalSubscription = interval(1000)
    .pipe(
      tap(() => {
        // Agregamos un nuevo producto a la señal
        this.products.update((products) => [
          ...products,
          {
            id: products.length + 1,
            name: `Product ${products.length + 1}`,
            quantity: 0,
          },
        ]);
      }),
      take(7) // se emitirá 7 veces
    )
    .subscribe(); // nos suscribimos automaticamente para ejecutarlo

  ngOnDestroy(): void {
    // quitamos la suscripción cuando el componente
    this.intervalSubscription.unsubscribe();
  }

  // En base al valor emitido actualizamos dicho producto
  public updateProduct(product: Product, quantity: number) {
    this.products.update((products) =>
      products.map((p) => (p.id === product.id ? { ...p, quantity } : p))
    );
  }
}
