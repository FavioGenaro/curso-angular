import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  // selector: Podemos colocar esa directiva en un elemento html
  selector: '[customLabel]'
})
// Podemos implementar el OnInit, es como si tuvieramos un componente, podemos usar todo el ciclo de vida
export class CustomLabelDirective implements OnInit{
  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _errors?: ValidationErrors | null; // error que recibimos del formulario

  // Recibimos el color generado, colocamos set para que se pueda mandar la propieda en string desde el html
  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle(); // cambiamos el color cada vez que se establece uno nuevo
  }

  // Recibimos los errors 
  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage(); // cada que cambien los errores, mostramos el mensaje
  }


  // Tenemos acceso al elemento html donde se coloco la directiva
  constructor(private el: ElementRef<HTMLElement>) {
    console.log(el);
    this.htmlElement = el;
    // cambiamos su contenido
    // this.htmlElement.nativeElement.innerHTML = 'Hola mundo';
  }

  ngOnInit(): void {
    console.log('NgOnInit - Directiva')
    this.setStyle(); // al cargar el componente se estable el color por defecto
  }

  // Cambiamos el color del span donde esta colocado la directiva
  setStyle():void {
    if ( !this.htmlElement )return;
    // con ! establecemos que el elemento siempre existe
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  // Colocamos el mensaje de error en el span
  setErrorMessage():void {
    if ( !this.htmlElement )return;
    if ( !this._errors ) {
      // si no hay errores vaciamos el texto
      this.htmlElement.nativeElement.innerText = '';
      return;
    }
    // obtenemos un arreglo con los tipos de errores
    const errors = Object.keys(this._errors);
    console.log(errors)

    // si el error es 'required'
    if ( errors.includes('required') )  {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.'; // establecemos el mensaje
      return; // solo mostramos el primer error detectado
    }
    // para el minlength
    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }
    // validación como Email
    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }
  }
}
