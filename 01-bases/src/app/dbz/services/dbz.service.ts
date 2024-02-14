import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { Character } from '../interfaces/character.interface';

// esto es una simple clase con su decorador
// Este decorador le dice a Angular que este es un servicio
@Injectable({
    // es se agrega para que este servicio sea un singleton en toda la aplicación, 
    // sino lo hacemos tendriamos que declarar el servicio en los providers del AppModule.
    // siempre que usemos el servicio lo debemos hacer mediante inyección de dependencias para tenerlo tal cual esta
    providedIn: 'root' 
})
export class DbzService {
    // recordar que en Js los objetos pasan por referencia, por lo que este arreglo de objetos
    // será modificada directamente
    public characters:Character[] = [
        {
            id: uuid(),
            name: 'Krillin',
            power: 1000
        },
        {
            id: uuid(),
            name: 'Goku',
            power: 9500
        },
        {
            id: uuid(),
            name: 'Vegeta',
            power: 7500
        }
    ];

    // creamos un método para recibir el valor desde el evento emitido por el hijo
    // onNewCharacterPadre(character:Character): void{
    //     // console.log("Desde Main Page: ",character)
    //     this.characters.push(character); // agregamos el character al final de la lista
    // }

    // añadimos el caracter con su id propio
    onNewCharacterPadre( character: Character ):void {

        const newCharacter: Character = { id: uuid(), ...character };
        this.characters.push(newCharacter);
    }
    

    // metodo que se ejecuta al recibir la emision del evento del list-component
    // onDeleteCharacterIndex(index:number):void{
    //     this.characters.splice(index,1)
    // }

    // eliminamos por id
    onDeleteCharacterIndex( id:string ) {
        this.characters = this.characters.filter( character => character.id !== id );
    }

}