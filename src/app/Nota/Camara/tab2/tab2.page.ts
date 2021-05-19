import { PhotoService, Photo } from '../../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController) {}
  async ngOnInit() {
      await this.photoService.loadSaved();
      //Se cargan las fotografias guardadas
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    //se manda a llamar al metodo para agregar nuevas fotos
  }
//Metodo para invocar una hoja de accion a la hora de seleccionar cierta foto de la galeria
  public async showActionSheet(photo: Photo, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
      text: 'Borrar',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
        //Se escoje la opcion de borrar y se manda a llamar al metodo de eliminar fotografia
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Se cancela, la hoja de acciones se cierra automáticamente
        }
    }]
  });
  await actionSheet.present();
}

}
