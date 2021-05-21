/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Usuario } from './usuario.model';

import { User } from './../services/usuarios';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
export interface LoginResponseData{// exportamos esta interface para consumir la API
 kind: string;
 idToken: string,
 email: string;
 refreshToken: string;
 expiresIn: string;
 localId: string;
 registered?: boolean;
}
@Injectable({
 providedIn: 'root'
})
export class LoginService {
  id: any;

//Variables que se usan para la creacion de la bd
//Asi como almacenar lo que se manda a guardar
  private storage: SQLiteObject;
  userlist = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //Variables que se usan a la hora de mapear el usuario
 private _usuarioLoggeado = true;
 private _usuario = new BehaviorSubject<Usuario>(null);

 get usuarioLoggeado(){
 //return this._usuarioLoggeado;
 return this._usuario.asObservable().pipe(map(user => {
 if(user){
 return !!user.token;
 }
 else{
 return false;
 }
 }));
 }
 //inyeccion de la dependencia HttpClient
 constructor(
private platform: Platform,
private sqlite: SQLite,
private httpClient: HttpClient,
private sqlPorter: SQLitePorter,
 ) {
  this.platform.ready().then(() => {
    this.sqlite.create({
      name: 'positronx_db.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
        this.storage = db;
        this.getFakeData();
    });
  });
}
//Devuelve el estado de la bd
dbState() {
  return this.isDbReady.asObservable();
}

fetchUsers(): Observable<User[]> {
  return this.userlist.asObservable();
}

getFakeData() {
  this.httpClient.get(
    'assets/dump.sql',
    {responseType: 'text'}
  ).subscribe(data => {
    this.sqlPorter.importSqlToDb(this.storage, data)
      .then(_ => {
        this.getUser(0);
        console.log('Usuario: '+this.getUser(0));
        this.isDbReady.next(true);
      })
      .catch(error => console.error(error));
  });
}


//Agregamos el usuario a la base de datos
addUsuario(id, email, contrasena) {
  let data = [id, email, contrasena];
  return this.storage.executeSql('INSERT INTO users (id, email, contrasena) VALUES (?, ?)', data)
  .then(()=>{
    });
}
//Obtenemos el ususario de la base de datos por medio del id
getUser(id): Promise<User> {
  return this.storage.executeSql('SELECT * FROM users WHERE id = ?', [id]).then(res => {
    return {
      id: res.rows.item(0).id,
      email: res.rows.item(0).email,
      contrasena: res.rows.item(0).contrasena
    }
  });
}

//Metodo para cerrar sesion
 logout(id){
  this._usuario.next(null);
  //Se elimina al usuario de la sesion cuando salga de ella
 return this.storage.executeSql('DELETE FROM users WHERE id = ?', [id])
  .then(_ => {
    this.getUser(id);
  });

 }

//Se consume la API enviando como parametros el email y la password ingresados
 signup(email: string, password: string){
 return this.httpClient.post<LoginResponseData>(
 `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
 {email: email, password: password, returnSecureToken: true}
 );
 }


//En este metodo guardamos el usuario logeado
 private setUserDate(userData: LoginResponseData){
 const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
 this._usuario.next(new Usuario(userData.localId, userData.email, userData.idToken, expTime));
 }


//Metodo para hacer el login con los usuarios ya guardados
 login(email: string, password: string){
 return this.httpClient.post<LoginResponseData>(
 `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
 {email: email, password: password, returnSecureToken: true}
 ).pipe(tap(this.setUserDate.bind(this)));
 }
}
