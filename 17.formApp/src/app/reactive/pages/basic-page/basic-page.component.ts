import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Valores del producto
const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{
  // public myForm: FormGroup = new FormGroup({
  // FormControl recibe: valor por defecto, validaciones sincronas y validaciones asincronas (puede ser una o varias)
  //   name: new FormControl('', [],[]),
  //   price: new FormControl(0), // se puede colocar solo el valor por defecot
  //   inStorage: new FormControl(0),
  // });
  private fb: FormBuilder = new FormBuilder()
  constructor( fb: FormBuilder ){}

  // Construcción con formBuilder, que es una mejor sintaxis
  public myForm: FormGroup = this.fb.group({
    // recibe primero el valor por defecto
    // puede recibir una o varios validores en un arreglo, el objeto Validators viene en el modulo.
    // Seran requeridos, tamaño minimo y valor minimo
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })

  ngOnInit(): void {
    // reseteamos los valores de los input en base al objeto rtx5090
    this.myForm.reset( rtx5090 );
  }

  // creamos un metodo para simplificar las validaciones
  // Detectamos el error, esta es la simplificaciones del ngIf del video anterior
  isValidField( field: string ): boolean | null {
    // Con esto tenemos un método que esta pendiente de la existencia de un error y de que si ha sido tocado o no para un input o field
    // ya no usa el getError, porque el getError obtiene un error espefico, aqui solo queremos saber si o no errores.
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  // con este método obtneemos el mensaje de error
  getFieldError( field: string ): string | null {

    // Verifica si no existe el campo dentrl de myForm, si no existe retorna null.
    if ( !this.myForm.controls[field] ) return null;

    // Obtenemos el arreglo de errores
    const errors = this.myForm.controls[field].errors || {};
    // iteramos el arreglo en base a las keys que pueden ser required, minlength
    for (const key of Object.keys(errors) ) {
      // un mensaje de validacion por cada error
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null; // retornamos un null o '' que no se mostrará
  }


  // click en guardar
  onSave():void {

    // console.log(this.myForm.value)
    // comprobamos la validaciones dentro del formulario
    if ( this.myForm.invalid ) {
      // este método indica que todos los campos fueron tocados, esto activa todas las validaciones
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    // reset restablece el formulario en los input en null y los demás como el valor pristine o touch en sus valores iniciales
    // adempas recibe un objeto que hace match con las propiedades o inputs de myForm
    this.myForm.reset({ price: 0, inStorage: 0 });

  }
}
