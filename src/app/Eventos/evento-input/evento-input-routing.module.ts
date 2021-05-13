import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoInputPage } from './evento-input.page';

const routes: Routes = [
  {
    path: '',
    component: EventoInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoInputPageRoutingModule {}
