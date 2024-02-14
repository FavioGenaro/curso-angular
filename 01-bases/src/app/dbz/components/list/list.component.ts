import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  // este decorador lo colocamos sobre un property
  // la property que queremos recibir desde el exterior será esta y se llamará characterList a menos que especifiquemos su nombre 
  // en el parentesis del decorador. El valor que le pasen debe ser del mismo tipo definido aquí

  // Por defecto el valor de characterList será el que declaramos acá, si desde el exterior le pasan otro valor, pues será reemplazado
  // por ese. ESTO ES COMO LAS PROPS EN REACT
  @Input()
  public characterList:Character[] = [
    {
      name: 'Trunks',
      power: 10
    }
  ];

  // Emitir
  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();
  // public onDelete = new EventEmitter<number>();

  // public in:number = 0;
  
  onDeleteCharacter(id?:string):void{
    // console.log(index);
    // this.onDelete.emit(index);
    console.log(id);
    if ( !id ) return;
    this.onDelete.emit( id );
  }
}
