import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { cantBeStrider } from '../../../shared/validators/validators';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
@Component({
  templateUrl: './regiter-page.component.html',
  styles: ``
})
export class RegiterPageComponent {

  constructor(
    fb: FormBuilder,
    validatorsService: ValidatorsService,
    emailValidator: EmailValidator
  ) {}

  private fb = new FormBuilder();
  private validatorsService = new ValidatorsService();
  private emailValidator = new EmailValidator();

  // cada validador recibe como argumente implicito el formControl de su input
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )]],
    // this.emailValidator es la validaciones asinctrona
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
    // cantBeStrider, por defector recibe un formControl
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }
  // Podemos agregar un segundo objeto dentro del formGroup, donde podemos agregar validadores grupales a nivel del formulario
  ,{ // este validador recibe como argumente todo el formulario (un formGroup)
    validators: [
      // este método nuevo recibe el nombre de los campos a evaluar, pero tmb recibe el formGroup
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2') // recibe el campo de 'password'y 'password2'
    ]
  }
  );

  

  // Funcion para validar la existencia de un error en un campo
  isValidField( field: string ) {
    // los Obtenemos de un servicio
    return this.validatorsService.isValidField( this.myForm, field );
    // return true
  }

  onSubmit() {
    // marca todo el formulario
    this.myForm.markAllAsTouched();

    if(this.myForm.invalid){
      return;
    }
    console.log(this.myForm.value) // imprimimos los valores
  }
}
