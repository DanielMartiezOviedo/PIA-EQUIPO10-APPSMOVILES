/* eslint-disable eol-last */
import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  constructor(private data: DataService) {}
  //Metodo que refresca la pagina cada 1000 milisegundos
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }
  //Metodo que devuelve el arreglo donde se contienen todas las notas
  getMessages(): Message[] {
    return this.data.getMessages();
  }
   //Metodo que borra la nota del id que se mando como parametro
  //Aparte que actualiza el arreglo que se manda a guardar en el storage
  borrarNota(i){
    this.data.messages.splice(i,1);
    this.data.guardarNota(this.data.messages);
  }
   //Obtiene el numero de Evento o indice del evento, segun su posicion en el arreglo y se lo asigna
  //a una variable que es usada en el service para modificar los datos de dicho evento seleccionado
  editarNota(i){
    this.data.aEditar=i;
  }
   //Actualiza los datos locales a la hora de entrar a la pagina de notas
  ngOnInit() {
    this.data.cargarNotas();
  }

}
