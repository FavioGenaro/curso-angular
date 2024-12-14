import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  private fb = new FormBuilder();
  public myForm: FormGroup = this.fb.group({
    // requerimos el nombre y le agregamos sus validadores
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([ // este es un FormArray, un arreglo de FormsControls
      ['Metal Gear', Validators.required ], 
      ['Death Stranding', Validators.required ],
    ])
  });

  // Creamos un FormControl aislado del FormGroup, se asocia con el Agregar favorito
  // este solo servira para crear FormControls dentro del FormArray del FormGroup
  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor( fb: FormBuilder ) {}

  get favoriteGames() {
    // obtenemos el favoriteGames, que debemos convertirlo a FormArray,
    // porque el get retorna un Abstract control y ademos convertilo para que sepa que es un FormArray
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // identificamos la existencia de un error dentro de un elmento del FormGroup
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  // Valida la existencia de un error en un FormControl de un FormArray
  // Mandamos un FormArray y el indice del FormControl
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors // si hay error en un FormControl del FormArray
        && formArray.controls[index].touched;
  }

  // Para obtener el mensaje de error en base a un FormControl, igual a lo que hicimos en basic-page
  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};
    // itera sobre la lista de errores
    for (const key of Object.keys(errors) ) {
      // por cada error se muestra un mensaje
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }

  // Para eliminar un input o FormControl del FormArray
  onDeleteFavorite( index:number ):void {
    // favoriteGames es el get, como en TS todo pasa por referencia(en caso de los objetos), se modifica el objeto original
    this.favoriteGames.removeAt(index);
  }

  // Método para crear un input
  onAddToFavorites():void {

    if ( this.newFavorite.invalid ) return; // validamos
    const newGame = this.newFavorite.value; // extraemos el valor del input

    // this.favoriteGames.push(  new FormControl( newGame, Validators.required ) );
    // favoriteGames es el get, que retorna un FormArray, así que podemos agregar un FormArray
    this.favoriteGames.push(
      // forma de agregarlo con el FormBuilder, this.fb.control retorna un FormControl
      this.fb.control( newGame, Validators.required )
    );

    // resetamos el valor del FormControl
    this.newFavorite.reset();
  }

  onSubmit():void {

    // si es invalido marcamos a todo como si se hubiera tocado
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value); // mopstramos
    // al hacer submit vaciamos el FormArray, porque el reset solo elimina el contenido de los FormControl,
    // pero no elimina elementos del FormArray. Los hacemos usando el FormBuilder
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]); // this.fb.array([]): retorna una instancia de FormArray vacía.
    // resetamos el formulario
    this.myForm.reset();
  }
}
