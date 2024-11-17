import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  // inyectamos el servicio
  constructor( private heroesService: HeroesService ) {}

  // al iniciarse el componente
  ngOnInit(): void {
    // usamos el servicio para obtener la lista de herores
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes ); // suscripción la observable
  }
}
