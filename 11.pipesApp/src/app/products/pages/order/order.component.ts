import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  public isUpperCase: boolean = false;
  toggleUpperCase():void {
    this.isUpperCase = !this.isUpperCase;
  }

  public heroes: Hero[] = [ // arreglo de heroes
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green,
    },
  ]

  // esta variable toma el valor de las propiedades de un Hero en string
  // es un variable que puede ser undefined
  public orderBy?: keyof Hero;
  changeOrder( value: keyof Hero ){
    this.orderBy = value; // cambiamos el valor de orderBy
  }

}
