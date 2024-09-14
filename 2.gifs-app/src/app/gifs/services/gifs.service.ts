import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

// providedIn en root hace que el servicio este disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey:string = 'IFm8i8SKpet8sVpu7Uzb1q4u0vuRvGEw';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage(); // Esto se ejecuta cuando el servicio es inyectado por primera vez.
  } // inyectamos el servicio HttpClient

  get tagsHistory(){
    // como los arreglos se pasan por referencia, es que usamos ... para destructurar los elementos en un arreglo
    // genera un arreglo nuevo para evitar conflictos con la referencia
    return [...this._tagsHistory];
  }

  // metodo para organizar el historial
  private organizeHistory(tag:string){
    tag = tag.toLowerCase(); // en minuscula

    if ( this._tagsHistory.includes( tag ) ) {
      // si el tag ya existe, lo eliminamos de la lista
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }
    // colocamos el tag al inicio
    this._tagsHistory.unshift( tag );
    // solo debemmos tener 10 elementos como máximo
    this._tagsHistory = this.tagsHistory.splice(0,10); 
    this.saveLocalStorage(); // Guardamos el localStorage
  }

  // Guardamos el localStorage el historial
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  // Cargamos el historial del localstorage a la página
  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return; // no hay datos

    // Obtenemos el historial
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! ); // el dato no será nulo !.
    // historial vacio, eso puede no suceder por como hemos realizado este servicio, pero de igual forma validamos
    if ( this._tagsHistory.length === 0 ) return;

    // Buscamos el primer elemento del historial,
    this.searchTag( this._tagsHistory[0] );
  }

  // Agregamos el tag al historial
  searchTag(tag:string):void{
    if(tag.length==0) return; // con esto evitamos busquedas vacias
    this.organizeHistory(tag); // organizamos nuestro historial

    // HttpParams tmb es del modulo http
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10' )
      .set('q', tag )

    // petición http
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params:params }) // params es del tipo params(HttpParams)
      .subscribe(resp => {
        // console.log(resp);
        this.gifList = resp.data;
        console.log(this.gifList);
      })

    // console.log(this._tagsHistory)
  }
}
