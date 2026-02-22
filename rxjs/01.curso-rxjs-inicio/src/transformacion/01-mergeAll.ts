import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, pluck, mergeAll } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResp } from '../interfaces/github-users.interface';


// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append( textInput, orderList );

// Helpers
const mostrarUsuarios = ( usuarios: GithubUser[] ) => {
    
    console.log(usuarios);
    orderList.innerHTML = '';

    for( const usuario of usuarios ) {

        const li  = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;

        const anchor  = document.createElement('a');
        anchor.href   = usuario.html_url;
        anchor.text   = 'Ver página';
        anchor.target = '_blank';

        li.append( img );
        li.append( usuario.login + ' ' );
        li.append( anchor );

        orderList.append(li);
    }

}

// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

// obtenemos el valor del input
// realizamos una petición HTTP
// mergeAll permite obtener el resultado de la petición HTTP, sin necesidad de anidar otro subscribe
// con pluck obtenemos el array de usuarios, que se encuentra dentro de la propiedad items
input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    map<string, Observable<GithubUsersResp>>( texto => ajax.getJSON<GithubUsersResp>(
        `https://api.github.com/search/users?q=${ texto }`
    )), 
    mergeAll<GithubUsersResp>(),
    pluck<GithubUsersResp, GithubUser[]>('items')
).subscribe( mostrarUsuarios );
// ).subscribe( console.log );

