/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';

export interface Message {
  titulo: string;
  descripcion: string;
  date: string;
  id: number;
  read: boolean;
}
export interface List {
  titulo: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  aEditar: number=-1;
  public messages: Message[] = [
    {
      titulo: 'Entrega de PIA',
      descripcion: 'Exposicion del pia en llamada',
      date: '8:00 AM',
      id: 0,
      read: false,
      },
  ];

  public list: List[] = [
    {
      titulo: 'Salir a correr',
      id: 0,
      read: false,
      },
      {
        titulo: 'Estudiar',
        id: 0,
        read: false,
        },
  ];

  constructor() { }

 public getList(): List[] {
    return this.list;
  }
  public getMessages(): Message[] {
    return this.messages;
  }
  public getListById(id: number): List {
    return this.list.find(el => el.id === id);
  }

  public getMessageById(id: number): Message {
    return this.messages.find(el => el.id === id);
  }

  public addMessageInput(message: any) {
    this.messages.unshift({
      titulo: message.titulo,
      descripcion: message.descripcion,
      date: this.getCurrentTime(),
      id: this.messages.length,
      read: false,
    });

    console.log(this.messages);
  }

  public editarMessageInput(message: any, index: number) {
    this.messages[index]={
      titulo: message.titulo,
      descripcion: message.descripcion,
      date: this.getCurrentTime(),
      id: this.messages.length,
      read: false,
    };
    console.log(this.messages);
  }

  public addListInput(list: any) {
    this.list.unshift({
      titulo: list.titulo,
      id: this.list.length,
      read: false,
    });

    console.log(this.list);
  }

  getCurrentTime(){
    const currentDate = new Date();
    return     currentDate.getHours() + ':'
             + currentDate.getMinutes() + ' '
             + this.getTimeSpecific(currentDate.getHours());
  }

  getTimeSpecific(hour){
    return hour > 12 ? 'PM' : 'AM';
  }

  public addMessage() {
    this.messages.unshift({
      titulo: 'Entrega de PIA',
      descripcion: 'Exposicion del pia en llamada',
      date: this.getCurrentTime(),
      id: this.messages.length,
      read: false,
    });
  }
  public addList() {
    this.list.unshift({
      titulo: 'Entrega de PIA',
      id: this.messages.length,
      read: false,
    });
    }
}
