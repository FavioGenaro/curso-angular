import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  // FormGroup agrupa los controles que tendremos en el formulario en general
  public heroForm = new FormGroup({
    // por defecto cada valor es un string o null, pero podemos colocarle tipado, valor por defecto y validaciones
    id:        new FormControl<string>(''), // string y por defecto es ''
    superhero: new FormControl<string>('', { nonNullable: true }), // este valor no puede ser null (validación)
    publisher: new FormControl<Publisher>( Publisher.DCComics ), // debe ser un enum Publisher, por defecto es DCComics
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  // Opciones para la lista desplegable
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // para obtener los parametros del enlace
    private router: Router,
    private snackbar: MatSnackBar, // inyectamos el servicio de los snackbar de angular material
    private dialog: MatDialog,
  ) {}

  // como esta con get, podemos usarlo como objeto
  get currentHero(): Hero {
    // convertimos al tipo Hero, para pasarlo a los servicios
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  // mostramos el snackbar, tiene un mensaje, un boton done y una duración en ms
  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

  ngOnInit(): void {
    // cuando carga la pagina vemos si estamos editando 
    if ( !this.router.url.includes('edit') ) return;
    // obtenemos los parametros
    this.activatedRoute.params
      .pipe(
        // destructuramos los parametros para obtener el id y obtenemos los datos del heroe
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => { // el getHeroById retorna un tipo Hero
        // si no existe el heroe, navegamos al listado
        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }
        // al formulario heroForm le pasamos los valores del hero
        // el reset estable cada valor con el input
        this.heroForm.reset( hero );
        return;
      });

  }

  onSubmit():void {

    // console.log({
    //   // vemos si el FormGroup es valido
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value // los valores del formulario

    // })

    if ( this.heroForm.invalid ) return; // si no es valido no hace nada

    if ( this.currentHero.id ) { // si tiene id se actualiza
      // si bien this.heroForm.value tiene los mismos atributos que Hero, no es la misma, pore eso se creó currentHero
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // mostramos un mensaje de validación
          this.showSnackbar(`${ hero.superhero } updated!`);
        });

      return;
    }
    // para crear un hero
    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // navegamos a la parte de edición del nuevo heroe y mostramos el mensaje
        this.router.navigate(['/heroes/edit', hero.id ]);
        this.showSnackbar(`${ hero.superhero } created!`);
      });
  }


  // Eliminación de un heroe
  onDeleteHero() {
    // esto si no tenemos un heroe seleccionado o en edición
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    // abrimos el componente ConfirmDialogComponent
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value // enviamos esta data
    });

    // despues de cerrar la ventana
    dialogRef.afterClosed()
      .pipe(
        // result puede ser true, false o undefined (si se presiona fuera del modal este tmb se cierra)
        filter( (result: boolean) => result ), // si es true el filter lo deja pasar al switchMap
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )), // disparamos el observable, se hace una suscripcion al observable
        filter( (wasDeleted: boolean) => wasDeleted ), // wasDeleted puede ser true o false
      )
      .subscribe(() => { // si wasDeleted es true, se ejecuta este subscribe. Aquí se recibe el result, pero este valor ya no nos importa
        this.router.navigate(['/heroes']);
      });

    /*
    // puede ser dificil de leer tener un suscribe dentro de otro
    dialogRef.afterClosed().subscribe(result => {
      console.log({result}) // imprimos un resultado que viene de la ventana
      if ( !result ) return; // false

      // result = true, eliminamos el heroe
      console.log('Heroe eliminado')
      // recordemos que un observable no se ejecuta si no hay alguien suscrito
      this.heroesService.deleteHeroById( this.currentHero.id )
        .subscribe( wasDeleted => {
          if ( wasDeleted ) // si retorna true debe enviarmos a la pagina /heroes
            this.router.navigate(['/heroes']);
      })
    });*/

  }
}
