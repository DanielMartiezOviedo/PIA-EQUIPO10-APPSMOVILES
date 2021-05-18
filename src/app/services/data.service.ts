/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable , OnInit} from '@angular/core';

//Las siguientes interfaces son las que se utilizaran para crear
//los arreglos donde se guardaran los datos


//Message(NOTAS): Interfaz creada para las notas, con titulo, descripcion;
//-Tiene el id para su manejo en el arreglo
//-El Dato date recogera la hora y fecha en que se ingreso la fecha
export interface Message {
  titulo: string;
  descripcion: string;
  date: string;
  id: number;
  read: boolean;
}
//Eventos: Interfaz creada para los eventos, con titulo, descripcion;
//-Tiene el id para su manejo en el arreglo
//-El Dato date recogera la hora y fecha en que se programara el evento
export interface Eventos {
  titulo: string;
  descripcion: string;
  date: string;
  id: number;
  read: boolean;
}
//List: Interfaz creada para las listas de pendientes, cuenta con titulo, descripcion;
//-Tiene el id para su manejo en el arreglo
//-Como fue un extra, y lo planteamos como algo un poco mas practico que un evento o nota
// estas solo se podra agregar un titulo para su facil visualizacion y un checkbox para marcarla
//asi como la opcion de borrarla
export interface List {
  titulo: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
//Variable que guardara la posicion del evento o nota a editar, se le hace una pqueña modificacion
//del -1 por la forma en que se acomodan los items en el arreglo
  aEditar: number=-1;
  //Se declara el storage que nos ayudara a guardar nuestros arrglos con datos
  private _storage: Storage | null= null;

  //En las siguientes 3 lineas se declaran los arreglos que usaremos para manejar los
  //datos ingresados
  public messages: Message[] = [ ];
  public eventos: Eventos[] = [ ];
  public list: List[] = [ ];
//Inyeccion de las dependecias
  constructor(private storage: Storage, private alertCtrl: AlertController) {
    this.init();
   }
//funcion que al iniciar crea el storage
   async init(){
     const storage= await this.storage.create();
     this._storage=storage;
   }
//Los siguientes 3 metodos se encargan de guardar los arreglos (segundo parametro) en la memoria,
//estos los guarda con un nombre que son el que recibe como primer parametro
   guardarLista(list){
     this.storage.set('listas', this.list);
   }
   guardarNota(messages){
    this.storage.set('notas', this.messages);
  }
  guardarEvento(eventos){
    this.storage.set('eventos', this.eventos);
  }


  //Los sigueintes 3 metodos se encargan de cargar o actualizar los arreglos a la memoria,
  //justo a la seccion que se indica, que es la que se da en el primer parametro de las funciones
  // de guardar
  async cargarListas(){
    const listas= await this.storage.get('listas');
    if(listas){
      this.list =listas;
    }
  }

  async cargarNotas(){
    const notas= await this.storage.get('notas');
    if(notas){
      this.messages =notas;
    }
  }

  async cargarEventos(){
    const eventos= await this.storage.get('eventos');
    if(eventos){
      this.eventos =eventos;
    }
  }


//Metodos que devuelven los valores que esten en los arreglos
 public getList(): List[] {
    return this.list;
  }
  public getMessages(): Message[] {
    return this.messages;
  }
  public getEventos(): Eventos[] {
    return this.eventos;
  }


//Metodos que nos ayudan a identificar un item en especifico de los arreglos,
//buscandolo por el id que se recibe como parametro
  public getListById(id: number): List {
    return this.list.find(el => el.id === id);
  }

  public getMessageById(id: number): Message {
    return this.messages.find(el => el.id === id);
  }
  public getEventoById(id: number): Eventos{
    return this.eventos.find(el => el.id === id);
  }

  //Los siguientes 3 metodos reciben como parametro un conjunto de datos del formulario
  //que se adaptan a el tipo de datos que se necesita segun el caso (notas, evento, lista)
  //Este metodo ingresa esos datos a una variable separandola por sus caracteristicas (titulo, date, descripcion, etc)

  //Metodo para las notas
  public addMessageInput(message: any) {
    this.messages.unshift({
      titulo: message.titulo,
      descripcion: message.descripcion,
      date: this.getCurrentTime(),//Asigna la hora actual
      id: this.messages.length,
      read: false,
    });
    //Guarda la nota en la memoria
    this.guardarNota(this.messages);
    console.log(this.messages);
  }

  //Metodo para los eventos
  public addEventoInput(eventos: any) {
    this.eventos.unshift({
      titulo: eventos.titulo,
      descripcion: eventos.descripcion,
      date: eventos.date, //Asgina la fecha y hora seleccionada y ya transformada a string
      id: this.eventos.length,
      read: false,
    });
    //Guarda el evento en la memoria
    this.guardarEvento(this.eventos);
    console.log(this.eventos);
  }

    //Metodo para las listas
  public addListInput(list: any) {
    this.list.unshift({
      titulo: list.titulo,
      id: this.list.length,
      read: false,
    });
   //Guarda la lista en la memoria
this.guardarLista(this.list);
    console.log(this.list);
  }

    //Los siguientes 2 metodos reciben como parametro un conjunto de datos del formulario
  //que se adaptan a el tipo de datos que se necesita segun el caso (notas, evento)
  // asi como un numero indice que es el que indica a que posicion del arreglo se asignaran los daots
  //Este metodo ingresa esos datos a una variable separandola por sus caracteristicas (titulo, date, descripcion, etc)


  //Metodo para las notas
  public editarMessageInput(message: any, index: number) {
    this.messages[index]={
      titulo: message.titulo,
      descripcion: message.descripcion,
      date: this.getCurrentTime(),//Se asgina la hora de la actualizacion
      id: this.messages.length,
      read: false,
    };
    //Guarda la nota en la memoria
    this.guardarNota(this.messages);
    console.log(this.messages);
  }


   //Metodo para los eventos
  public editarEventoInput(eventos: any, index: number) {
    this.eventos[index]={
      titulo: eventos.titulo,
      descripcion: eventos.descripcion,
      date: eventos.date,
      id: this.eventos.length,
      read: false,
    };
    //Guarda el evento en la memoria
    this.guardarEvento(this.eventos);
    console.log(this.eventos);
  }


 //Los siguientes 2 metodos fueron usados para obtener la hora especifica, en un formato de 12 hrs
  getCurrentTime(){
    const currentDate = new Date();
    return     currentDate.getHours() + ':'
             + currentDate.getMinutes() + ' '
             + this.getTimeSpecific(currentDate.getHours());
  }

  getTimeSpecific(hour){
    return hour > 12 ? 'PM' : 'AM';
  }

}
