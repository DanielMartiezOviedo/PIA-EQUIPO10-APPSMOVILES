import { Usuario } from './../../login/usuario.model';
import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../../Nota/services/data.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }

  getList(): List[] {
    return this.data.getList();
  }
  borrarList(i){
    this.data.list.splice(i,1);
  }

  ngOnInit() {
  }

}
