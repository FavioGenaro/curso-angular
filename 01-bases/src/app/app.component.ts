import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // define el app-root, el nombre del componente
  templateUrl: './app.component.html', // html
  styleUrls: ['./app.component.css'] // css, que pueden ser varios archivos
})
export class AppComponent {
  // title = '01-bases'; // este es un atributo de clase, esta en su forma corta

  // es mejor o más descriptivo hacerlo así:
  public title: string = "Mi primera App en angular";
  

}
