import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    // loadChildren: cargamos el modulo por lazyLoad.
    // import contiene la ruta del modulo a cargar
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate:[PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    // si queremos que esta ruta este protegida, colocamos todos los guards
    // AuthGuard implementa canActivate y canMatch
    canActivate:[AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    // este no tiene carga perezosa
    path: '404',
    component: Error404PageComponent,
  },
  {
    // por defecto será el path heroes
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    // cualquier otra ruta que no sean las definidas se muestra el 404
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
