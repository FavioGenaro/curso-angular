import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // Expresiones de regulares para el email y name.
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Para el username
  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  constructor() { }

  // Para la detección del error en un campo
  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // PAra varificar que dos campos son iguales
  // queremos que forme parte del formulario como tal y no un validador asincrono aparte
  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    // retorna un ValidationErrors, que es un objeto como tal
    // recibe un formGroup que representa a todo nuestro formulario, 
    // aunque en realizar recibe un AbstractControl, que puede ser tmb un FormControl, entre otros.
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      // extraemos los valores de los campos que vamoa a evaluar
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // si no son iguales
      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true }); // Establemos un error para el campo de 'password2'
        return { notEqual: true } // retornamos un ValidationErrors como objeto
      }

      formGroup.get(field2)?.setErrors(null); // asignamos un error en null
      return null;
    }

  }

}
