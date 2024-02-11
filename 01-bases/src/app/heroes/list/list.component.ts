import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  // arreglo de strings
  public heroNames: string[] = ['Spiderman','Ironman','Hulk','She Hulk', 'Thor'];
  public deletedHero?: string; // será opcional

  removeLastHero():void {
    // el pop retorna el elemento removido
    this.deletedHero = this.heroNames.pop();
  }
}
