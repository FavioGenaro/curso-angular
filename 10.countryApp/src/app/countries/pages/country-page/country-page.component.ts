import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{
  
  public country?: Country; // el  ? indica que puede ser nulo

  // inyectamos un observable, permite la extracion de datos de la URL
  constructor(
    private activatedRoute:ActivatedRoute,
    private countriesService: CountriesService,
    private router:Router
  ){}

  // al inicializarse el componente vamos a obtener el param de la url
  ngOnInit(): void {
    this.activatedRoute.params // params es un observable
      .pipe(
        // switchMap realiza una suscripción al searchCountryAlphaCode (observabl), se ejecuta y retorna el resultado de la busqueda
        switchMap(({id}) => this.countriesService.searchCountryAlphaCode(id))
      )// usamos pipe de RxJS, porque params es un observable
      .subscribe(country => { // country el el resultado del searchCountryAlphaCode
        // console.log(country)
        if(!country){
          return this.router.navigateByUrl('');
        }
        // console.log('EXISTE UN PAIS')
        return this.country = country; // asignamos el valor a la variable country

      })

      // .subscribe(({id}) => { // nos suscribimos al observable para que se ejecute
      //   // console.log({params: params['id']}) // se recibe como id: <valor>, id lo definimos el countries-routing.module.ts

      //   // Aquí tenemos aun Observable Help, que es un observable dentro de otro
      //   this.countriesService.searchCountryAlphaCode(id)
      //     .subscribe(country => {
      //       console.log(country)
      //     })
      // })
  }

  // searchCountry (code:string){

  // }

}
