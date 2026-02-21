
import { ajax } from 'rxjs/ajax';

// esta url demora 1 segundo en responder, por eso es ideal para probar el operador timeout
const url = 'https://httpbin.org/delay/1';

// el segundo argumento de getJSON es un objeto con los headers que queremos enviar
const obs$ = ajax.getJSON( url, {
    'Content-Type': 'application/json',
    'mi-token': 'ABC123'
});

obs$.subscribe( data => console.log('data:', data ));


