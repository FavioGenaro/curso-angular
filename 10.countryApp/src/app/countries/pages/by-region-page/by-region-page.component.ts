import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];

  // Areglo tipo region, esto hace que si agregamos un nuevo elemento y no es de las opciones definidas, este marca un error
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region; // colocamos ? porque al inicio no tiene un valor de Region, por lo que puede ser null

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  constructor( private countriesService: CountriesService ) {}

  searchByRegion (region: Region):void{
    // console.log('Desde ByCapitalPage')
    // console.log({term})
    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => { 
      this.countries = countries;
    });
  }
}
