import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaInputPageRoutingModule } from './nota-input-routing.module';

import { NotaInputPage } from './nota-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaInputPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotaInputPage]
})
export class NotaInputPageModule {}
