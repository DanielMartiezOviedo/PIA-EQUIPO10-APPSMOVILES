import { Injectable } from '@angular/core';
@Injectable({
 providedIn: 'root'
})
export class LoginService {
 private usuarioLoggeado = false;
 get usuarioLoggedo(){
 return this.usuarioLoggeado;
 }
 constructor() { }
 login(){
 this.usuarioLoggeado = true;
 }
 logout(){
 this.usuarioLoggeado = false;
 }
}
