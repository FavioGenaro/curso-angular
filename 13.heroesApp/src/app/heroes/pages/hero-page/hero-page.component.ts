import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  // inyectamos servicios
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // permite obtener la ruta actual o activa
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params // obtenemos los parametros, este es el id del heroe
      .pipe(
        // pemite tomar los params, destructurarlos para obtener el id
        switchMap( ({ id }) => this.heroesService.getHeroById( id )), // hacemos la consulta y retornamos el heroe
      )
      .subscribe( hero => { // recibimos el heroe

        // si no viene el heroe (no exite y retorna el error), retornamos a la lista
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);
        // asignamos el heroe retornado.
        this.hero = hero;
        // console.log(hero);
        return; // el suscribe debe retorna algo, por eso colocamos el return vacio
      })
  }

  goBack():void {
    // nos retorna a la lista
    this.router.navigateByUrl('heroes/list')
  }
}
