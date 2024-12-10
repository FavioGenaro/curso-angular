import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

// para que se considere un Guard debemos implementar al menos una interfaz
// CanMatch, antes CanLoad: Entramos a una ruta que haga match de la url
// CanActivate: Para activar una ruta en particular o donde esta el guard
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
      .pipe(
        // aquí solo lo mostramos por consola
        tap( isAuthenticated => console.log('Authenticated:', isAuthenticated ) ),
        tap( isAuthenticated => {
          // no esta autenticado, nos lleva al login
          if ( !isAuthenticated ) {
            this.router.navigate(['./auth/login'])
          }
        }),
      )
  }

  // recibe la ruta y los segmentos que se solicitan. 
  // Retorna un bool u observable boleano, true para que pase y false para que no pase a la ruta
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('Can Match');
    console.log({ route, segments })
    // return false;
    return this.checkAuthStatus();
  }
  // RouterStateSnapshot es la fotografica de como esta el router, como params
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    console.log('Can Activate');
    console.log({ route, state })
    // return false;
    return this.checkAuthStatus();
  }

}
