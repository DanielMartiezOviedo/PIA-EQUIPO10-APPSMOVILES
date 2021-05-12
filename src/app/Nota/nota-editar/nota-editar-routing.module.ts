import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaEditarPage } from './nota-editar.page';

const routes: Routes = [
  {
    path: '',
    component: NotaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaEditarPageRoutingModule {}
