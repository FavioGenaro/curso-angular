import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// usamos platformBrowserDynamic(). para realizar aplicaciones web. Luego hace .bootstrapModule de nuestra aplicacion principal
// con electron, ionic podemos crear aplicaiones mobiles combinado con angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); // si hay un error lo muestra en consola
