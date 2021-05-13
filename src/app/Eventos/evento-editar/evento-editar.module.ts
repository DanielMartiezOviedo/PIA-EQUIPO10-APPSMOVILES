import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoEditarPageRoutingModule } from './evento-editar-routing.module';

import { EventoEditarPage } from './evento-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EventoEditarPage]
})
export class EventoEditarPageModule {}
