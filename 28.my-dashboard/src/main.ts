import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// arranque de la aplicación, que primero recibe el componente y luego la configuración del app.config
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
