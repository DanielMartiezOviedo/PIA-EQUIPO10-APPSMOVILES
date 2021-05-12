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
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'nota-input',
    loadChildren: () => import('./Nota/nota-input/nota-input.module').then( m => m.NotaInputPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'lista-input',
    loadChildren: () => import('./Lista/lista-input/lista-input.module').then( m => m.ListaInputPageModule)
  },
  {
    path: 'fotos-nota',
    loadChildren: () => import('./Nota/fotos-nota/fotos-nota.module').then( m => m.FotosNotaPageModule)
  },

 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
