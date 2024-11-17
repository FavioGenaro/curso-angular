import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  // pasamos el heroes, este retona el string correspondiente a la ruta de la imagen
  transform( hero: Hero ): string {
    if ( !hero.id && !hero.alt_img ) { // si no tiene id ni img
      return 'assets/no-image.png';
    }

    if ( hero.alt_img ) return hero.alt_img; // si lo tiene, lo retorna

    // si no tiene hero.alt_img, pero si ID, entonces armamos la url de la imagen
    return `assets/heroes/${ hero.id }.jpg`;
  }

}
