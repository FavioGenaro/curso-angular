import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

// para que sea considerado un validador asincrono, se debe implementar el AsyncValidator
// debemos implementar el método validate
@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {

    validate(control: AbstractControl ): Observable<ValidationErrors | null> {

        const email = control.value;
        // Este es un observable que hace de peticion http
        // La clase Observable recibe un callback que recibe un subscriber. todo dentro del callback ya es asincrono
        const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {
            console.log({ email });
            // consideremos que fernando@google.com viene de la petición http para verificar que el correo ya esta registrado
            if ( email === 'fernando@google.com' ) { // correo registraod
                subscriber.next({ emailTaken: true }); // .next emite un valor, que este caso es un objeto
                subscriber.complete(); // completamos el observable y termina la función con el .complete()
                // return;
            }
            // emitimos el valor de null y terminamos la función
            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay( 3000 ) // tiempo de la petición http.
        );
    
        return httpCallObservable; // retronamos el observable
    
    }

    // debe retornar una promesa o observable, estos deben retornar un tipo ValidationErrors o nullo
    // AbstractControl es un padre de FormControl (un input)
    // validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    //     const email = control.value; // obteemos el valor del email
    //     console.log({ email })

    //     return of({
    //         emailTaken: true // al retorna este objeto, hará que sale el error siempre
    //     }).pipe(
    //         delay( 1000 ) // delay para simular la asincronia
    //     );
    // }
}