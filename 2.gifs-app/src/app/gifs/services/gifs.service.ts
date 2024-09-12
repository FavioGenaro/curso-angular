import { Injectable } from '@angular/core';

// providedIn en root hace que el servicio este disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  getTagsHistory(){
    // como los arreglos se pasan por referencia, es que usamos ... para destructurar los elementos en un arreglo
    // genera un arreglo nuevo para evitar conflictos con la referencia
    return [...this._tagsHistory];
  }

  // Agregamos el tag al historial
  searchTag(tag:string){
    this._tagsHistory.unshift(tag); // se añaden al inicio

    console.log(this._tagsHistory)
  }
}
