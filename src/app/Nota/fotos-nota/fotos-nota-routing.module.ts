import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosNotaPage } from './fotos-nota.page';

const routes: Routes = [
  {
    path: '',
    component: FotosNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosNotaPageRoutingModule {}
