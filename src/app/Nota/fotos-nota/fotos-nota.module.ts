import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosNotaPageRoutingModule } from './fotos-nota-routing.module';

import { FotosNotaPage } from './fotos-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosNotaPageRoutingModule
  ],
  declarations: [FotosNotaPage]
})
export class FotosNotaPageModule {}
