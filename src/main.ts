import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Drivers, Storage } from '@ionic/storage';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

if (environment.production) {
  enableProdMode(); 
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
