import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  // Subject es un tipo de observable, al que podemos suscribirnos, aplicar pipes, etc.
  private debouncer: Subject<string> = new Subject<string>();
  // Vamos a manejar la descripción de forma distinta, vamos a almacenarla
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output() // EventEmitter: emitiremos un dato tipo string
  public onValue: EventEmitter<string> = new EventEmitter()

  @Input()
  public initialValue: string = ''; // termino de busqueda

  @Output() // emitimos este valor hacia los componente padre, este es el valor de la busqueda para que se realice la petición
  public onDebounce = new EventEmitter<string>();

  // se ejecuta cuando se inicializa el componente
  ngOnInit(): void {
    // Almacenamos la suscripción, .subscribe retorna un tipo Subscription
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300) // tiene dos parámetros, 1. es el tiempo ha esperar para hacer la siguiente emisión
      // el observable emite un valor, llega al pipe y donde debounceTime espera X segundos para ver si recibo más valores
      // si recibe otro valor en ese laxo ,vuelve a esperar por más valores y no emite un valor
    )
    // si pasa 300ms y no esicribio, se ejecuta este suscribe
    .subscribe( value => {
      this.onDebounce.emit( value ); // hacemos un emit de onDebounce hacia componentes padre
      // console.log()
    });
  }


  // OnDestroy es parte del ciclo de vida del componente, se ejecuta cuando el componente es destruido
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe(); // nos desuscribimos o anulamos la suscripción
  }


  // Se ejecuta por cada tecla presionada
  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm ); // .next para realizar una siguiente emisión del observable
  }


  // método para capturar los datos y enviarlos a la lista
  emitValue(term:string):void{
    console.log('Desde search-box, componente hijo')
    console.log(term)

    if(term.length === 0) return;
    this.onValue.emit(term); // emitimos el valor al componente padre
  }

}
