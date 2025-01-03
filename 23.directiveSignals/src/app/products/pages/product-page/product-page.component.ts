import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  // constructor( private fb: FormBuilder ) {}
  // Veremos una forma de hacer inyección de dependencias
  // no creamos una instancia de FormBuilder (new FormBuilder()) sino mandamos la clase que queremos inyectar
  private fb = inject( FormBuilder );

  public color:string = 'green';

  // Creamos el FormGroup
  public myForm: FormGroup = this.fb.group({
    // Creamos el campo name y validaciones sincronas
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ]
  });

  // Realiza el cambio de color aleatorio
  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}
