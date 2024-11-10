import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    // podemos usar loadchildren para cargar ciertas secciones de forma perezosa pero este no es un modulo grande,
    // además que cargamos todos este modulo con loadchildren en app-routing
    // Rutas hijas del path vacio
    children: [
      { path: 'new-hero', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: NewPageComponent }, // recibimos el argumento id
      { path: 'list', component: ListPageComponent },
      // recibimos el argumento id, si lo colocamos primero de la lista no se podrian entran al resto de rutas
      // porque se considería a new-hero o search como id
      { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: 'list' }, // cualquier otra ruta, :id lo tapa, pero cuando el path este vacio si entrá aquí
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
