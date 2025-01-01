import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-zoom-range',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10; // valor del zoom
  public map?: Map; // Colocamos ? porque será null una parte del tiempo
  // objeto de longitud y latitud de mapbox. Colocamos esos valores por defecto
  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477); 


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners(); // activamos el listener
  }

  ngOnDestroy(): void {
    this.map?.remove(); // eliminamos todo el mapa, ya que cada vez que recargamos se crea un nuevo mapa y sus listener
    // podemos apagar cada listener
    // this.map?.off('move', () => {});
  }

  // Cuando modificamos el zoom mediante el mapa no se detectan los cambios, para eso creamos los listener
  mapListeners() {
    // sino existe
    if ( !this.map ) throw 'Mapa no inicializado';

    // Vamos a escuchar el zoom dentro del mapa
    this.map.on('zoom', (ev) => {
      // se dispara este callback. ! para indicar que nunca será undefined, porque ya hicimos una validación antes
      this.zoom = this.map!.getZoom();
    });

    // zoomend es el evento cuando termina el zoom, podemos irnos a 20, pero cuando terminemos de hacer el zoom nos pasa a 18
    this.map.on('zoomend', (ev) => {
      // el ! indica que map no será null
      if ( this.map!.getZoom() < 18 ) return; // debe ser menor a 18
      this.map!.zoomTo(18); // si es mayor 18, debemos devolverlo a 18
    });

    // se ejecuta cuando el mapa se mueve
    this.map.on('move', () => {
      // Obtenemos la longitud y latitud del centro
      this.currentLngLat = this.map!.getCenter();
      // const {lng, lat} = this.currentLngLat // se puede extraer 
    });
  }

  // BOTONES
  // Incremenetamos el zoom
  zoomIn() {
    // puede ser null y con eso se evita que se ejecute el zoomIn() y genere un error
    this.map?.zoomIn();
  }
  // Bajamos el zoom
  zoomOut() {
    this.map?.zoomOut();
  }

  // BARRA
  // Cuando movamos la barra, se actualiza el zoom en el mapa
  zoomChanged( value: string ) {
    this.zoom = Number(value); // cambiamos a número
    this.map?.zoomTo( this.zoom ); // asignamos el zoom
  }

}
