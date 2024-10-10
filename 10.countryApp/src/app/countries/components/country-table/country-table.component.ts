import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 25px;
    }`
  ]
})
export class CountryTableComponent {
  // recibimos la lista de paises
  @Input()
  public countries: Country[] = [];

}
