import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  // templateUrl: './title.component.html',
  template: `
    <h1 class="text-3xl mb-5">{{ title }}</h1>
  `,
  styles: ``
})
export class TitleComponent {

  // El ! indica que ese valor nunca será undefined, ya que angular nos pide inicializarlo con algun valor
  // required indica que sera requerido cuando el componente sea importado
  @Input({ required: true })
  public title!:string; //  = 'titulo por defecto'

  // transform cambia el valor mandado del componente padre a un valor boleano
  // si manda un string o entero lo cambia a booleano. En caso no mande un valor, 
  // pero se invoque a la variable por defecto será true
  @Input({ transform: booleanAttribute }) withShadow:boolean = false;
} 
