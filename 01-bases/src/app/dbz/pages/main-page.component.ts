import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
    selector: 'app-dbz-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent {

    // en una clase normal el private|public name:string genera un atributo, en angular esto genera una inyección de dependencias
    // esto nos trae la info que se maneja en ese servicio y sus métodos
    constructor(private dbzService: DbzService){ // colocar el servicio es private es buena práctica
        // dbzService.
    }


    // Para usar los métodos o variables privadas dentro del template o HTMl del componente(si esta en privado no se puede acceder), 
    // debemos crear gets y otro métodos públicos.
    get characters(): Character[] {
        return [...this.dbzService.characters];
    }
    
    onDeleteCharacter( id: string ):void {
        this.dbzService.onDeleteCharacterIndex( id );
    }
    
    onNewCharacter( character: Character ):void {
        this.dbzService.onNewCharacterPadre( character );
    }


    // // esta variable la pasamos al componente list component, quien tiene una variable con @input
    // public characters:Character[] = [
    //     {
    //         name: 'Krillin',
    //         power: 1000
    //     },
    //     {
    //         name: 'Goku',
    //         power: 9500
    //     },
    //     {
    //         name: 'Vegeta',
    //         power: 7500
    //     }
    // ];

    // // creamos un método para recibir el valor desde el evento emitido por el hijo
    // onNewCharacterPadre(character:Character): void{
    //     // console.log("Desde Main Page: ",character)
    //     this.characters.push(character); // agregamos el character al final de la lista
    // }

    // // metodo que se ejecuta al recibir la emision del evento del list-component
    // onDeleteCharacterIndex(index:number):void{
    //     this.characters.splice(index,1)
    // }

}