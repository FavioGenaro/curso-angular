import { FormControl, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

// No puede ser Strider (digamos que este username se repite), recibe un tipo FormControl, que representa a un input en el formulario
// esta es una validacion sincrona, por lo que va en el segundo atributo del FormControl
// Las asincronas retornan un observable o promesa.
// REtornamos un ValidationErrors, propio de Angular o un null, que significa que no hay errores
export const cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase(); // obtenemos el valor dle FormControl

    if ( value === 'strider' ) {
        return { // regresamos un objeto con el error
            noStrider: true,
        }
    }

    return null;
}