import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'maps-full-screen',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  // ViewChild obtiene la referencia de un elemento HTML, para la referencia local colocamos el nombre a secas
  // para otro tipo elementos se sigue la nomenclatura de css
  @ViewChild('map') 
  public divMap?: ElementRef; // colocamos ?, porque al cargar la clase este es undefined

  // se ejecuta cuando se termina la inicialización de la vista
  ngAfterViewInit(): void {
    console.log(this.divMap);

    // si el elemento html no existe
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      // container: this.divMap.nativeElement,
      container: this.divMap.nativeElement, // container ID, hace referencia al DIV, puede ser un HtmlElement
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
