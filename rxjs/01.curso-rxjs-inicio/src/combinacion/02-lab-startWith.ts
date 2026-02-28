import { ajax } from 'rxjs/ajax';
import { startWith } from 'rxjs/operators';

// Referencias
// elemento de carga
const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.innerHTML = 'Cargando...';

const body = document.querySelector('body');

// Stream
// Simulamos una petición HTTP con un delay de 3 segundos
ajax.getJSON('https://reqres.in/api/users/2?delay=3')
.pipe(
    startWith(true) // esta cargando
)
// emite primero el valor true, luego emite la respuesta de la petición HTTP
.subscribe( resp => {

    if( resp === true ) {
        body.append( loadingDiv ); // muestra el loading
    } else {
        // Si la respuesta es diferente a true, 
        // significa que ya se recibió la respuesta de la petición HTTP
        document.querySelector('.loading').remove();
    }
    
    console.log(resp);
})
