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

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }

  getEventos(): Eventos[] {
    return this.data.getEventos();
  }
  ngOnInit() {
  }
  borrarEvento(i){
    this.data.eventos.splice(i,1);
  }
  editarEvento(i){
    this.data.aEditar=i;
  }

}
