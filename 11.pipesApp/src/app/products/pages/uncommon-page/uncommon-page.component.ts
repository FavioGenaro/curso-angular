import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {
  // i18n Select
  public name: string = 'Fernando';
  public gender: 'male'|'female' = 'male'; // limitado a dos valores
  public invitationMap = { // map, 
    male: 'invitarlo', // si el valor es male, dirá 'invitarlo'
    female: 'invitarla' // si es female, dirá 'invitarla'
  }

  changeClient():void {
    // cambia el valor de las variables
    this.name = 'Melissa';
    this.gender = 'female';
  }

  // i18nPlural
  public clients: string[] = ['Maria','Pedro','Fernando', 'Hernando', 'Eduardo', 'Melissa', 'Natalia'];
  public clientsMap = {
    // si es igual a 0, 1, 2 se muestran esos textos
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 personas esperando.',
    // para otros valores se coloca el # en representación del número, que se reemplazará
    'other': 'tenemos # clientes esperando.',
  }

  // Quita el primer cliente de la lista
  deleteClient(): void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Canada',
  }

  // Async Pipe
  // interval permite crear un observable para emitir valores desde 0,1,2(2000),... segundos
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value ) ), // emite el value cada 2 segundos
  );

  // con una promesa, este valor es una promesa que retorna o resuelve un string
  public promiseValue: Promise<string> = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve( 'Tenemos data en la promesa.' ); // retorna este texto
      console.log( 'Tenemos data en la promesa.'); // veremos que se ejecuta a pesar que el componente se destruya
      this.person.name = 'Otro nombre'
    }, 3500); // 3.5 segundos
  })
}
