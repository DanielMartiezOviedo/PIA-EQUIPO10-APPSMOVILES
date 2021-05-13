import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoInputPageRoutingModule } from './evento-input-routing.module';

import { EventoInputPage } from './evento-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoInputPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EventoInputPage]
})
export class EventoInputPageModule {}
