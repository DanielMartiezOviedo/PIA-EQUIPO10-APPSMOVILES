/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async loadSaved() {
    // Recupera los datos de la matriz de fotos en caché
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // Aqui se detecta si se esta corriendo en la web, y en dado caso de que no, le indica que hacer
    if (!this.platform.is('hybrid')) {
      // Muestra la foto en formato base64
      for (let photo of this.photos) {
        // Lee los datos de cada foto guardada del sistema de archivos
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
        });

        // Solo plataforma web: carga la foto como datos base64
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
  public async addNewToGallery() {
    // Tomar la foto.
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Guardar la foto y agregarla a la galeria
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

  }

 // Guardar la imagen en un archivo en el dispositivo
 private async savePicture(cameraPhoto: CameraPhoto) {
  // Convierte la foto al formato base64, requerido por la API del sistema de archivos para guardar
  const base64Data = await this.readAsBase64(cameraPhoto);

  // Escribe el archivo en el directorio de datos
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: FilesystemDirectory.Data
  });

  if (this.platform.is('hybrid')) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }
  else {
// Use webPath para mostrar la nueva imagen en lugar de base64 ya que ya esta guardada en la memoria
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }
}


public async deletePicture(photo: Photo, position: number) {
  // Elimina la foto usando como referencia el arreglo Photos
  this.photos.splice(position, 1);

  // Actualice la memoria caché de la matriz de fotos sobrescribiendo la matriz de fotos existente
  Storage.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos)
  });

  // Eliminar archivo de foto del sistema de archivos
  const filename = photo.filepath
                      .substr(photo.filepath.lastIndexOf('/') + 1);

  await Filesystem.deleteFile({
    path: filename,
    directory: FilesystemDirectory.Data
  });
}


  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" detectara Cordova o Capacitor
    if (this.platform.is('hybrid')) {
      // Lee el archivo en formato base64
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // Obtener la foto, leerla como un blob y luego convertirla al formato base64
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
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
