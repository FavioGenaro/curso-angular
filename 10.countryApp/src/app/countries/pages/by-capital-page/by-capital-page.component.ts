import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  public isLoading: boolean = false;

  searchByCapital (term: string):void{
    this.isLoading = true; // inicia la busqueda, se muestra el spinner

    this.countriesService.searchCapital( term )
    // debemos suscribirmos para que la petición se ejecute, si no usamos el .subscribe, simplemente no hace esa peticion
    
    .subscribe( countries => { 
      this.countries = countries; // guardamos los resultados en la variable de este componente
      this.isLoading = false; // termina la busqueda, se oculta el spinner
    });
  }
}
