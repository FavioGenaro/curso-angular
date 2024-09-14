import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
// OnInit, es un método especial de angular (ciclo de vida), que se ejecuta cuando el componente se ha inicializado
// Con esto podemos tener un capturador de errores o validador en caso se inicialice con errores
export class CardComponent implements OnInit {


  @Input()
  public gif!: Gif; // con ! dicimos que ese valor siempre se recibira

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }
}
