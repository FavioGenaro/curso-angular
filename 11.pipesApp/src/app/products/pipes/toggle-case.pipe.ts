import { Pipe, PipeTransform } from "@angular/core";

// fernando | toggleCase  = 'FERNANDO'
// FERNANDO | toggleCase  = 'fernando'

@Pipe({ // el decorador para indicar que es un Pipe
    name: 'toggleCase' // este nombre del pipe es obligatorio
})
export class ToggleCasePipe implements PipeTransform {

    // PipeTransform define el método transform que realizará la transformación de los datos

    // este método recibe la variable value y de forma opcional los argumentos
    // transform( value: string): string {

    //     return value.toUpperCase(); // convertimos a mayuscula
    // }

    // recibe un valor como string y recibe un argumento de tipo boolean
    transform( value: string, toUpper: boolean = false ): string {

        return ( toUpper ) // lo retorna en mayuscula o minuscula 
            ? value.toUpperCase()
            : value.toLowerCase();
    }

}