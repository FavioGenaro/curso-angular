import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{
  
  @Input()
  public url!:string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false; // para indicar que la imagen se cargo

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required.');
  }

  // metodo para cambiar el valor de la variable cuando la imagen cargue
  onLoad() {
    // podemos colocar un setTimeOut para observar el loader
    this.hasLoaded = true;
  }

}
