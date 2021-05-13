import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Lista/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./Nota/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'nota-input',
    loadChildren: () => import('./Nota/nota-input/nota-input.module').then( m => m.NotaInputPageModule)
  },
  {
    path: 'lista-input',
    loadChildren: () => import('./Lista/lista-input/lista-input.module').then( m => m.ListaInputPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./Nota/Camara/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'nota-editar',
    loadChildren: () => import('./Nota/nota-editar/nota-editar.module').then( m => m.NotaEditarPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Eventos/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'evento-input',
    loadChildren: () => import('./Eventos/evento-input/evento-input.module').then( m => m.EventoInputPageModule)
  },
  {
    path: 'evento-editar',
    loadChildren: () => import('./Eventos/evento-editar/evento-editar.module').then( m => m.EventoEditarPageModule)
  },

 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
