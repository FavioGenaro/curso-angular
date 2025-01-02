import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {
  // este componente recibe la longitud y latitud
  @Input() lngLat?: [number, number];

  // para la refereic aal div donde se colocará el mapa
  @ViewChild('map') divMap?: ElementRef;

  // 
  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";

    // Creamos el mapa
    const map = new Map({
      container: this.divMap.nativeElement, // container ID, elemento div
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: 15,
      interactive: false // con esto restringimos la interactivdad del mapa, 
      // para que no se puede hacer zoom o mover el marker y quede como una imagen
    });
    // creamos un marcardor con la ubicación
    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )

  }
}
