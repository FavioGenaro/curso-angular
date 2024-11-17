import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = []; // almacena los resultados
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ){} // inyecta el servicio

  searchHero() {
    const value: string = this.searchInput.value || ''; // obtiene el valor del input, este puede pasar por parametro

    // obtiene los resultados de la busqueda
    this.heroesService.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );
  }

  // evento de seleccion de una opción
  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    // console.log(event)
    //  si la opcion no existe
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }
    // obtenemos la heroe seleccionado
    const hero: Hero = event.option.value;
    // asignamos el valor del nombre del heroe seleccionado al input
    this.searchInput.setValue( hero.superhero );
    // variable que tiene le valor seleccionado
    this.selectedHero = hero;

  }
}
