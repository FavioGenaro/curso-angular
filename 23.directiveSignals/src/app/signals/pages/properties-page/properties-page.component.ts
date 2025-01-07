import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interface/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit{
  public counter = signal( 10 ); // creamos esta señal para pruebas

  // User con sus valores iniciales
  public user = signal<User>( {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  } );

  // propiedad computada para retornar el nombre completo
  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` );

  // effect es como una propiedad computada que ejecuta un callback cuando se detecta un cambio en alguna señal dentro del callback
  // se dispera una vez al cargar el componente y este effect ya no se ejecuta cuando el componente se destruye automaticamente
  public userChangedEffect = effect( () => {
    // se dispara cuando el user o el counter cambia
    // console.log( `${ this.user().first_name } - ${ this.counter() } ` );
  } );

  ngOnInit(): void {
    // se ejecuta cada segundo y al actulizar el counter dispara el effect
    setInterval( () => {
      this.counter.update( current => current + 1 );
      // podemos colocar un limite y limpiar el effect
      // if ( this.counter() == 15 )
      //   this.userChangedEffect.destroy();
    }, 1000 );
  }


  ngOnDestroy(): void {
    // con esto destruimos el efecto de forma mamual, 
    // pero de igual forma el efecto se destruye automaticamente al destruirse el componente
    // this.userChangedEffect.destroy();
  }

  // incrementamos el contador
  increaseBy( value: number ) {
    this.counter.update( current => current + value );
  }

  // tenempos el valor del campo a cambiar y su nuevo valor (para el user)
  // keyof User restringe a que la propiedad field sea solo una propiedad de User
  onFieldUpdated( field: keyof User, value: string ) {

    // esto es inseguro, porque podemos mandar un field o propiedad que no existe
    // pero esto es restringido porque field es un campo de User, si fuera de tipo string si habria un problema
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // También podemos hacer un update obteniendo el valor actual
    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))

    // Mediante un switch actualizamos el campo en especifico
    this.user.update( current => {

      switch ( field ) {

        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number( value );
          break;
      }
      return current;
    } );
  }
}
