import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  // ChangeDetectionStrategy.defavult hace que todo el tiempo se esten escuchando cambios sobre alguna propiedad sea señal o no
  // ChangeDetectionStrategy.OnPush, esta menos pendiente de los cambios, pero esto no afecta a las señales y mejora el performance
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TitleComponent],
  template: `
    
    <app-title [title]="currentFramework()" />
    <!--  el pipe json viene del commonModulo -->
    <!-- Mostramos la señal y la propiedad tradicional -->
    <pre> {{ frameworkAsSignal() | json }} </pre>
    <pre> {{ frameworkAsProperty | json }} </pre>
  `
})
export default class ChangeDetectionComponent {

  // señal computada de solo lectura
  public currentFramework = computed(
    () => `Change detection - ${ this.frameworkAsSignal().name }`
  );

  // Propiedad como señal
  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });
  // Propiedad tradicional
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      // Actualizamos el valor de la variable tradicional
      // Con ChangeDetectionStrategy.OnPush no se realiza este cambio en el html (El cambio se realiza de todas formas sin o con eso)
      // this.frameworkAsProperty.name = 'React';

      // Actualizamos el valor de la señal
      // Aún con el ChangeDetectionStrategy.OnPush se realiza el cambio, mejora el rendimiento porque las señales se encargan de los cambios
      this.frameworkAsSignal.update( value => { // value es el valor actual
        value.name = 'React';

        return {...value};
      })

      console.log('Hecho');
    }, 3000); // despues de 3 segundos
  }

}
