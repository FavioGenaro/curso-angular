import { NgModule } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';

// este es el decorador que hace de la clase un modulo
@NgModule({
    // declaramos los componentes del modulo
    declarations: [
        HeroComponent,
        ListComponent
    ],
    // con esto podemos exportar el componente al mundo exterior
    exports: [
        HeroComponent,
        ListComponent
    ],
    // debemos importar el commonModule, porque es el que tiene las directivas Ngif y Ngfor
    // este no era necesario en el app.module porque por defecto forma parte, al ser el componente principal
    imports:[
        CommonModule
    ]
})
export class HeroesModule {}