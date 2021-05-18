/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";

  constructor() { }

  public async loadSaved() {
    // Recuperar datos de matrices de fotos en caché
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    //Muestre la foto leyendo en formato base64
    for (let photo of this.photos) {
      // Leer los datos de cada foto guardada del sistema de archivos
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: FilesystemDirectory.Data
      });

      // Solo plataforma web: cargue la foto como datos base64
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  public async addNewToGallery() {
    // Tomar la foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 300
    });

    // Guardar la foto y agregarla a la galeria
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convierta la foto al formato base64, requerido por la API del sistema de archivos para guardar
    const base64Data = await this.readAsBase64(cameraPhoto);

    //Escribe el archivo en el directorio de datos.
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Use webPath para mostrar la nueva imagen en lugar de base64, ya que ya está cargada en la memoria
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Obtenga la foto, léala como un blob y luego conviértala al formato base64
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
