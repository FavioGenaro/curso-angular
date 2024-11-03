import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ // el decorador para indicar que es un Pipe
    name: 'canFly' // este nombre del pipe es obligatorio
})
export class CanFlyPipe implements PipeTransform {
    // recibe un valor como string y recibe un argumento de tipo boolean
    // puede retorna un string, pero podemos restringirlo a un más con 'vuela'|'no vuela'
    transform( value: boolean ): 'vuela'|'no vuela' {

        return ( value ) // lo retorna en mayuscula o minuscula 
            ? 'vuela'
            : 'no vuela';
    }
}