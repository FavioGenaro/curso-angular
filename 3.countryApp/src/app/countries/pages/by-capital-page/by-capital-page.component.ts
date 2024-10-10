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

  searchByCapital (term: string):void{
    // console.log('Desde ByCapitalPage')
    // console.log({term})

    this.countriesService.searchCapital( term )
    // debemos suscribirmos para que la petición se ejecute, sino usamos el .subscribe, simplemente no hace esa peticion
    //countries, es el arreglo de Country
    .subscribe( countries => { 
      this.countries = countries; // guardamos los resultados en la variable de este componente
    });
  }
}
