import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaEditarPageRoutingModule } from './nota-editar-routing.module';

import { NotaEditarPage } from './nota-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotaEditarPage]
})
export class NotaEditarPageModule {}
