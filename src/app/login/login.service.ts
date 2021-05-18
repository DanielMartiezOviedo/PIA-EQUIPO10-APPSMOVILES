/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from './usuario.model';
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
 private http: HttpClient
 ) { }

//Metodo para cerrar sesion
 logout(){
 this._usuario.next(null);
 }

//Se consume la API enviando como parametros el email y la password ingresados
 signup(email: string, password: string){
 return this.http.post<LoginResponseData>(
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
 return this.http.post<LoginResponseData>(
 `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
 {email: email, password: password, returnSecureToken: true}
 ).pipe(tap(this.setUserDate.bind(this)));
 }
}
