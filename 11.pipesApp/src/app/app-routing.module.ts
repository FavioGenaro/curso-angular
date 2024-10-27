import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // por defecto irá al BasicsPageComponent de products.module
    // loadChildren para hacer el lazyload
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule ),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
