import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  // Este componente recibe una lista de gifs
  @Input()
  public gifs: Gif[] = [];
}
