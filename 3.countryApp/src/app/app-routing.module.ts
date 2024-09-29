import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

// esta es la definición de mis rutas
const routes: Routes = [
    // {
    //     path: '',
    //     component: HomePageComponent,
    // },
    {
        path: 'about', // en la ruta about, se renderiza el componente AboutPageComponent
        component: AboutPageComponent
    },
    {
        path: 'contact', // en la ruta about, se renderiza el componente AboutPageComponent
        component: ContactPageComponent
    },
    {
        path: 'countries', // para que exista carga perezosa colocamos loadChildren
        // función de carga, es una promesa
        // recibe la ruta del modulo y en .then la clase del modulo, este modulo contiene la rutas hijas.
        // m es el archivo modulo. // las rutas hijas se renderizaran con countries/<>
        loadChildren: () => import('./countries/countries.module').then(m=>m.CountriesModule)
    },
    {
        path: '**', // cualquier otra ruta se va a home
        redirectTo: 'countries'
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