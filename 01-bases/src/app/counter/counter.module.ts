import { NgModule } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';

// este es el decorador que hace de la clase un modulo
@NgModule({
    // declaramos los componentes del modulo
    // esto hace que los componentes sean visibles dentro del módulo en general
    declarations: [
        CounterComponent
    ],
    // con esto podemos exportar el componente al mundo exterior
    // se podra importar desde otros modulos
    exports: [
        CounterComponent
    ]
})
export class CounterModule {}