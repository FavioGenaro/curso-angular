import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
  // recibe de su padre la variable hero, al no inicializarlo debemo colocar ! para indicar que siempre vendrá
  @Input()
  public hero!: Hero;

  // si se pasa la variable hero se debe retornar un error.
  ngOnInit(): void {
    if ( !this.hero ) throw Error('Hero property is required');
  }
}
