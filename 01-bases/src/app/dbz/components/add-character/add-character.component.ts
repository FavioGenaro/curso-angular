import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  // vamos a creamos nuestro emisor de datos
  // este es un generico, por lo que espeficamos el tipo de dato que emitirá  con <>
  @Output() // este decorador hace que la variable se pueda emitir y dentro de los parentesis tmb se puede cambiar
  public onNewCharacter: EventEmitter<Character> = new EventEmitter(); // es una instancia

  // two way data binding o enlace de datos bidireccional
  // quiere decir que si hacemos el cambio en la propiedad en el html se actualiza en TS y viceversa
  public character:Character = {
    name: '',
    power: 0
  }
  
  // método para capturar los datos y enviarlos a la lista
  emitCharacter():void{
    // console.log(this.character)

    if(this.character.name.length === 0) return;

    this.onNewCharacter.emit(this.character) // emitimos los datos

    // limpiamos los datos
    // this.character.name='';
    // this.character.power=0;

    // limpiamos con una sola asignación
    this.character = {
      name: '',
      power: 0
    }
  }

}
