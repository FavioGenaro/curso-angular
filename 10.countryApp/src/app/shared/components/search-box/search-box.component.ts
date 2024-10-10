import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output() // EventEmitter: emitiremos un dato tipo string
  public onValue: EventEmitter<string> = new EventEmitter()

   // método para capturar los datos y enviarlos a la lista
  emitValue(term:string):void{
    console.log('Desde search-box, componente hijo')
    console.log(term)

    if(term.length === 0) return;
    this.onValue.emit(term); // emitimos el valor al componente padre
  }

}
