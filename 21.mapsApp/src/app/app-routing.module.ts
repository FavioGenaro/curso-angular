import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule ),
  },
  // cargamos nuestro standalone component con lazyload
  {
    path: 'alone',
    // como es un componente usamos el loadComponent
    loadComponent: () => import('./alone/pages/alone-page/alone-page.component')
      .then( m => m.AlonePageComponent ), // con el then retornamos el componente
  },
  {
    path: '**',
    redirectTo: 'maps',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
