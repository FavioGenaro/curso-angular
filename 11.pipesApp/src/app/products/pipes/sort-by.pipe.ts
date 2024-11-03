import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {

  // recibe un arreglo de heroes
  // recibe de forma opciona el modo de ordenamiento, estas deben estar definidas por las propiedades del heroe
  // keyof  traduce las propiedades de Hero a un string y tambien puede ser un string vacio
  transform( heroes: Hero[], sortBy?: keyof Hero | '' ): Hero[] { // retorna un arreglo de Hero ordenados

    switch( sortBy ) {
      case 'name': 
        // el método sort necesita un método de comparación, a es la primera instancia y b el siguiente del arreglo
        // ver documentación de JS para entenderlo
        return heroes.sort( (a,b) => ( a.name > b.name ) ? 1 : -1 );

      case 'canFly':
        return heroes.sort( (a,b) => ( a.canFly > b.canFly ) ? 1 : -1 );

      case 'color':
        return heroes.sort( (a,b) => ( a.color > b.color ) ? 1 : -1 );

      default: // por defecto retornará la misma lista, esto en caso no se pase el valor de sortBy
        return heroes;
    }
  }
}