import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoEditarPage } from './evento-editar.page';

const routes: Routes = [
  {
    path: '',
    component: EventoEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoEditarPageRoutingModule {}
