import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaInputPage } from './nota-input.page';

const routes: Routes = [
  {
    path: '',
    component: NotaInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaInputPageRoutingModule {}
