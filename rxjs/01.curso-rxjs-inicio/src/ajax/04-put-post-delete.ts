import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

// ajax tiene métodos específicos para cada verbo HTTP, pero también se puede usar de forma genérica pasando el método por parámetro

// en el metodo get no se permite enviar un body, pero se pueden enviar parámetros por query o por headers
// el segundo parametro son los headers
// ajax.get( url, {
//     'mi-token': 'ABC123'
// }).subscribe( console.log  );


// en post y put se permite enviar un body, pero no se pueden enviar parámetros por query, solo por headers
// ajax.post( url, {
//     id: 1,
//     nombre: 'Fernando'
// }, {
//     'mi-token': 'ABC123'
// }).subscribe( console.log  );

// ajax.put( url, {
//     id: 1,
//     nombre: 'Fernando'
// }, {
//     'mi-token': 'ABC123'
// }).subscribe( console.log  );


// en delete no se permite enviar un body, pero se pueden enviar parámetros por query o por headers. Igual que get.

ajax({
    url: url,
    method: 'DELETE',
    headers: {
        'mi-token': 'ABC123'
    },
    body: {
        id: 1,
        nombre: 'Fernando'
    }
}).subscribe( console.log );
