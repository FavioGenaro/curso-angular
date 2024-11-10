import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// localhost:4200/auth/
// definimos las rutas
const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        // podemos usar loadchildren para cargar ciertas secciones de forma perezosa pero este no es un modulo grande,
        // además que cargamos todos este modulo con loadchildren en app-routing
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'new-account', component: RegisterPageComponent },
            { path: '**', redirectTo: 'login' }, // cualquier otra ruta
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ], // estas son rutas hijas
    exports: [ RouterModule ], // exportamos las rutas
})
export class AuthRoutingModule { }