import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaInputPageRoutingModule } from './lista-input-routing.module';

import { ListaInputPage } from './lista-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaInputPageRoutingModule
    ,ReactiveFormsModule
  ],
  declarations: [ListaInputPage]
})
export class ListaInputPageModule {}
