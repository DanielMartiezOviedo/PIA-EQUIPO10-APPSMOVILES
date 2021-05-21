import { DataService } from './../services/data.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { LoginService, LoginResponseData } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { formatCurrency } from '@angular/common';
@Component({
 selector: 'app-login'
,
 templateUrl: './login.page.html',
 styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Se utliza un form para el envió de la información
  //para posteriormente validarla y poder autenticarnos

 //Variables para saber si se intenta ingresar o registrarse
 isLoading: boolean = false;
 isLoginMode: boolean = true;

 //Inyeccion de dependencias
 constructor(
 private loginService: LoginService,
 private router: Router,
 private loadingCtrl: LoadingController,
 private alertCtrl: AlertController,
 private data: DataService
 ) { }
 ngOnInit() {
 }

//Metodo que trabaja con el ingreso de los datos del usuario, en caso de ser correctos se mandan al
//metodo de autenticacion para proceder al log in
 onSubmit(form: NgForm){
 if(!form.valid){
 return false;
 }
 const email = form.value.email;
 const pass = form.value.password;
 this.authenticate(email, pass);
 }

//Metodo switch para saber si se registra o ingresa
 onSwitchAuthMode(){
 this.isLoginMode = !this.isLoginMode;
 }

//Metodo para mensajes de alerta
 showAlert(titulo: string, mensaje: string){
 this.alertCtrl.create({
 header: titulo,
 message: mensaje,
 buttons: ['OK']
 }).then(alertEl => alertEl.present());
 }

//Este metodo es para la autenticacion, en el cual se consume el metodo login para el ingreso
 authenticate(email: string, password: string){
 this.isLoading = true;
 //this.loginService.login();
 this.loadingCtrl.create({
 keyboardClose: true,
 message: 'Cargando'
 })
 .then(loadingEl=>{
 loadingEl.present();
 let authObs: Observable<LoginResponseData>;
 if(this.isLoginMode){
 authObs = this.loginService.login(email, password);
 }
 else{
 authObs = this.loginService.signup(email, password);
 }
 authObs.subscribe(response => {
this.data.correo=email;
console.log('Variable del correo guardada: '+this.data.correo);
 this.loginService.addUsuario(0, email, password); //Se manda a guardar a la tabla de sqlite despues de autenticar
 console.log(response);
 this.isLoading = false;
 loadingEl.dismiss();
 this.router.navigateByUrl('/inicio');
 },
 errorResponse => {
 this.isLoading = false;
 loadingEl.dismiss();
 const error = errorResponse.error.error.message;
 //Mensajes para los diferentes casos de error en el login
 let mensaje ='Acceso incorrecto !';
 switch(error){
 case 'EMAIL_EXISTS':
 mensaje = 'Usuario ya existe !';
 break;
 case 'EMAIL_NOT_FOUND':
 mensaje = 'Usuario no existe !';
 break;
 case 'INVALID_PASSWORD':
 mensaje = 'Contraseña incorrecta !';
 break;
 }
 console.log(mensaje);
 this.showAlert('Error'
, mensaje);
 });

 });
 }
}
