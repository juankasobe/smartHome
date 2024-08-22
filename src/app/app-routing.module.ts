import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotificacionesComponent } from './pagina/notificaciones/notificaciones.component';
import { ConfiguracionComponent } from './pagina/configuracion/configuracion.component';
import { FocosComponent } from './pagina/anadir/focos.component';


const routes: Routes = [
  {
    path: 'notificaciones',
    component: NotificacionesComponent
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: 'focos',
    component: FocosComponent
  },
  {
    path: '',
    redirectTo: 'notificaciones',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
