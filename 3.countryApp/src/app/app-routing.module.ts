import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

// esta es la definición de mis rutas
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'about', // en la ruta about, se renderiza el componente AboutPageComponent
        component: AboutPageComponent
    },
    {
        path: '**', // cualquier otra ruta se va a home
        redirectTo: 'home'
    }
];


@NgModule({
    imports: [
        // como este es el enrutador principal, colocamos el método forRoot
        // Para rutas de modulos hijos usaremos forChild
        RouterModule.forRoot( routes ),// routes contiene las rutas
    ],
    exports: [
        RouterModule, // exportamos la configuración de nuestro router
    ]
})
export class AppRoutingModule { }