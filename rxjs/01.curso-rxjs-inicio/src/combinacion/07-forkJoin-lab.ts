import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

// En este ejemplo vamos a usar forkJoin para hacer varias peticiones a la API de GitHub, 
// y obtener el resultado de cada una de ellas en un solo objeto.
const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER    = 'klerith';

// En este ejemplo, vamos a hacer tres peticiones a la API de GitHub: una para obtener los datos del usuario, 
// otra para obtener los repositorios del usuario, y otra para obtener los gists del usuario.
forkJoin({
    usuario: ajax.getJSON(
        `${ GITHUB_API_URL }/${ GITHUB_USER }`
    ),
    repos: ajax.getJSON(
        `${ GITHUB_API_URL }/${ GITHUB_USER }/repo123123s`
    ).pipe(
        catchError( err => of([]) )
    ),
    gists: ajax.getJSON(
        `${ GITHUB_API_URL }/${ GITHUB_USER }/gists`
    )
}).pipe(
    catchError( err => of(err) )
)
.subscribe( console.log );
