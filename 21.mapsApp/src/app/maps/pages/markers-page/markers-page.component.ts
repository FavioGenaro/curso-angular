import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

// Interfaz para los marcadores
interface MarkerAndColor {
  color: string; // Guardamos el color, porque aún no hay forma de acceder al color por medio del Marker
  marker: Marker; // marker
}

// Esta interfaz es para guardarlos en localstorage, del marker solo necesitamos el lngLat, de por si el objeto marker es muy grande
interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'maps-markers',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = []; // Arreglo de marcadores
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: 13
    });

    // debemos obtener la lista de marcadores al inicializarse el mapa
    this.readFromLocalStorage();

    // Creamos html, este hace de marcador
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando Herrera'

    // const marker = new Marker({
    //   // color: 'red',
    //   // color: '#fff', // podemos colocar el color como hexadecimal
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat ) // se coloca en el centro
    //   .addTo( this.map );
  }

  // para el boton de Agregar Marcador
  createMarker() {
    if ( !this.map ) return;
    // generamos el color de forma aleatorio
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter(); // ubicación en el centro del mapa

    // creamos el marcador
    this.addMarker( lngLat, color );
  }


  // Agregamos el marcador mediante la ubicación u color
  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    // Creamos el marcador
    const marker = new Marker({
      color: color,
      draggable: true // se puede mover el marcador
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker, }); // Agregamos al arreglo

    // Guardamos el localstorage
    this.saveToLocalStorage();

    // escuchamos el evento de movimiento de cualquiera de los marcadores, este recibe de entrada el marker seleccionado
    // pero no usaremos el marker seleccionado, sino que llamamos a saveToLocalStorage() para actualizar su ubicación
    marker.on('dragend', () => this.saveToLocalStorage() );
  }

  // recibe el indice dentro del arreglo
  deleteMarker( index: number ) {
    this.markers[index].marker.remove(); // quitamos del arreglo del mapa con el método remove del marker
    this.markers.splice( index, 1 ); // Quitamos del arreglo
  }

  // recibimos el market, pero podemos recibir solo la ubicación long y latitud
  flyTo( marker: Marker ) {
    // navegamos a las coordenadas del marker
    this.map?.flyTo({
      zoom: 14, // podemos modificar el zoom
      center: marker.getLngLat()
    });
  }

  // Guardar en el localstorage
  saveToLocalStorage() {
    // en base a los markers realizamos un arreglo de PlainMarker
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray() // longitud y latitud como un arreglo
      }
    });
    // Guardamos en el localstorage
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  // Obtener los marcadores desde el localstorage
  readFromLocalStorage() {
    // obtememos el string del localstorage
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    // reconstruimos el arreglo de PlainMarker con JSON.parse, 
    // pero puede ser inseguro tomar un string y convertirlo en objeto, puede fallar si no tiene las propiedades de la interfaz
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!

    // Iteramos el arreglo y generamos cada marker con el addMarker
    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat; // destructuramos el arreglo
      const coords = new LngLat( lng, lat ); // creamos el objeto LngLat

      this.addMarker( coords, color );
    })

  }
}
