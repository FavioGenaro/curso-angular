import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// Colocamos directamente el html en vez de un archivo html. Se modifica templateUrl por template
// Quitamos el css

// #txtTagInput: es una referencia local, este nombre es como se le conocera al input a lo largo de todo el template
// keyup es el evento de la tecla levantandose despues de precionarse. por si solo representa a cualquier tecla
// keyup.enter representa solo a la tecla enter
@Component({
  selector: 'gifs-search-box',
  template: `
      <h5>Buscar:</h5>
      <input type="text"
        class="form-control"
        placeholder="Buscar gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput
      >
  `
})
export class SearchBoxComponent {
  
  // viewChild recibe el selector del elemento html. tagInput será la representación de ese html, ! para indicar que no será nulo
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; // tipado: tipo ElementRef y este es un elemento input

  constructor(private gifsService:GifsService) { }


  searchTag() {
    const newTag = this.tagInput.nativeElement.value;// En nativeElement estan todas las propiedades del input, como value
    // console.log({newTag})

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
  }

}
