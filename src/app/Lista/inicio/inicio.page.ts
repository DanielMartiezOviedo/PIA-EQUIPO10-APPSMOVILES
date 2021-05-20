import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../../services/data.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public data: DataService) {}
  //Metodo que refresca la pagina cada 1000 milisegundos
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }

  //Metodo que devuelve el arreglo donde se contienen todas las listas
  getList(): List[] {
    return this.data.getList();
  }
  //Metodo que borra la lista del id que se mando como parametri
  //Aparte que actualiza el arreglo que se manda a guardar en el storage
  borrarList(i){
    this.data.list.splice(i,1);
    this.data.guardarLista(this.data.list);
  }
  //Actualiza la lista a la hora de entrar a la pagina de inicio
  ngOnInit() {
    this.data.cargarListas();
  }

}
