import { Component } from '@angular/core';

@Component({
  selector: 'app-heores-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  public name:string = 'Iroman';
  public age: number = 40;

  // metodo que retorna algo, los métodos get son considerados propiedades
  get capitalizedName():string{ 
    return this.name.toUpperCase()

  }
  // este es un método normal
  getHeroDescription():string{
    return `${this.name} - ${this.age}`;
  }

  // si colocamos private solo se podrá acceder dentro de la clase, no puede ir dentro del template o html
  // private getHeroDescription():string{
  //   return `${this.name} - ${this.age}`;
  // }

  // creamos nuevos métodos
  changeHero(): void{
    this.name = "Spiderman";
  }

  changeAge(): void{
    this.age = 25;
  }

  resetForm(): void{
    this.name = "Iroman";
    this.age = 40;
  }
}
