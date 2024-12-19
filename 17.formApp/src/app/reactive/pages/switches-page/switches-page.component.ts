import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  // Formulario
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  // Valor por defecto en el formulario
  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(fb: FormBuilder) {}

  ngOnInit(): void {
    // Al iniciar el componente establecemos un valor por defecto en el formulario
    this.myForm.reset( this.person )
  }

  // identificamos la existencia de un error dentro de un elmento del FormGroup
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  //ngSubmit
  onSave() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    // digamos que queremos quitar termsAndConditions, porque no es parte de nuestro backend
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    // al person le asignamos el objeto que contiene las otros propiedades
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person); // esto podriamos enviarlo al back, porque ya no tiene termsAndConditions

  }
}
