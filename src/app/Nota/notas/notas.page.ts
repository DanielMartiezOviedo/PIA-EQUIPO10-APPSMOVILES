/* eslint-disable eol-last */
import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  borrarNota(i){
    this.data.messages.splice(i,1);
  }

  ngOnInit() {
  }

}
