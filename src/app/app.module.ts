import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificacionesComponent } from './pagina/notificaciones/notificaciones.component';
import { ConfiguracionComponent } from './pagina/configuracion/configuracion.component';
import { FormsModule } from '@angular/forms';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FocosComponent } from './pagina/anadir/focos.component';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@NgModule({
  declarations: [AppComponent, NotificacionesComponent, ConfiguracionComponent, FocosComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, IonicStorageModule.forRoot({
    name: 'configuracion',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  })],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy},
    BackgroundMode,
  AndroidPermissions],
  bootstrap: [AppComponent],
})
export class AppModule { }
