import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

// Creamos un type
type Grade = 'A'|'B'|'F';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [ TitleComponent ],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent {
  // señal para mostrar o no contenido signal(false).asReadonly hace que la señal sea solo de lectura
  public showContent = signal(false);
  public grade = signal<Grade>('A'); // señal de tipo Grade

  // señal para el @for
  public frameworks = signal(['Angular','Vue','Svelte','Qwik','React']);
  public frameworks2 = signal([]);

  // modifica el valor de la señal
  public toggleContent() {
    this.showContent.update( value => !value );

  }
}
