import { DataService, Eventos } from '../../services/data.service';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private data: DataService) {}
  //Metodo que refresca la pagina cada 1000 milisegundos
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }
  //Metodo que devuelve el arreglo donde se contienen todas las listas
  getEventos(): Eventos[] {
    return this.data.getEventos();
  }

  //Actualiza los datos locales a la hora de entrar a la pagina de calendario
  ngOnInit() {
    this.data.cargarEventos();
  }
  //Metodo que borra el evento del id que se mando como parametro
  //Aparte que actualiza el arreglo que se manda a guardar en el storage
  borrarEvento(i){
    this.data.eventos.splice(i,1);
    this.data.guardarEvento(this.data.eventos);

  }
  //Obtiene el numero de Evento o indice del evento, segun su posicion en el arreglo y se lo asigna
  //a una variable que es usada en el service para modificar los datos de dicho evento seleccionado
  editarEvento(i){
    this.data.aEditar=i;
  }

}
