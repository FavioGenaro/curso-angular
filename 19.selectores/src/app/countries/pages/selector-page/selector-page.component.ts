import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  // public borders: string[] = [];
  public borders: SmallCountry[] = [];

  // Creamos nuestro formulario
  private fb = new FormBuilder();
  public myForm: FormGroup = this.fb.group({
    region : ['', Validators.required ],
    country: ['', Validators.required ],
    border : ['', Validators.required ], // frontera
  });

  constructor(
    fb: FormBuilder,
    private countriesService: CountriesService, // al ser privado no puede ser invocado en el html
  ) {}

  // se ejecuta cuando se inicializa el componente, antes de la creación de variables y el constructor
  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged(); // declaramos el método que detecata cambios en el selector de paises
  }

  get regions(): Region[] { // retorna la lista de continentes
    return this.countriesService.regions;
  }

  // cuando se selecciona otra region
  onRegionChanged(): void {
    // coloca ! para indicarq que no será nulo
    // nos suscribimos a los cambios que puedan a ver al cambiar el valor de campo region.
    // this.myForm.get('region')!.valueChanges
    //   .subscribe( countries => {
    //       console.log({countries})
    //   });
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ), // limpiamos el selector de paises
        // tap( () => this.borders  = [] ),
        // switchMap recibe el valor de un observable y suscribe a otro observable
        // recibe el valor del campo region
        switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        console.log({countries})
        this.countriesByRegion = countries; // guardamos los paises del continente
      });
  }

  // método para cargar las fronteras cuando se cambia de país
  onCountryChanged(): void {
    // cuando cambia el selector de paises
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('') ), // limpiamos el selector de frontera
      filter( (value: string) => value.length > 0 ), // si el valor del selector no existe, no se continua con el método
      // si bien ya obtuvimos las fronteras con el onRegionChanged(), vamos a obtenerlo nuevamente
      // recibe el alphacode, porque el value del selector de paises es el country.cca3
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
      switchMap( (country) => this.countriesService.getCountryBordersByCodes( country.borders ) ), // obtemos los valore de cada frontera
    )
    .subscribe( countries => {
      console.log({countries}) // countries es los retornado por switchMap
      // this.borders = countries.borders;
      this.borders = countries;
    });
  }
}
