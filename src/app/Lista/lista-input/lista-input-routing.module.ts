import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaInputPage } from './lista-input.page';

const routes: Routes = [
  {
    path: '',
    component: ListaInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaInputPageRoutingModule {}
