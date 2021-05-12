import { Injectable } from '@angular/core';

export interface Message {
  titulo: string;
  descripcion: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      titulo: 'Entrega de PIA',
      descripcion: 'Exposicion del pia en llamada',
      date: '8:00 AM',
      id: 0,
      read: false,
      },
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
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
}
