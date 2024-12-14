import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiterPageComponent } from './pages/regiter-page/regiter-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'sign-up', component: RegiterPageComponent
      },
      { path: '**', redirectTo: 'sign-up' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
