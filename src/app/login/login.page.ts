import { Route, Router } from '@angular/router';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  isLoading = false;
  isLoginMode = true;


  constructor(
  private loginService: LoginService,
  private router: Router,
  private loadingCtrl: LoadingController
  ) { }
  ngOnInit() {
  }
  onLogin(){
  this.isLoading = true;
  this.loginService.login();
  this.loadingCtrl.create({
  keyboardClose: true,
  message: 'Validando ...'
  })
  .then(loadingEl=>{  loadingEl.present();  setTimeout(()=>{  this.isLoading = false;  loadingEl.dismiss();
  this.router.navigateByUrl('/inicio');
  }, 2000);
  });
  }

  onSubmit(form: NgForm){
    if(!form.valid){
    return false;
    }
    const email = form.value.email;
    const pass = form.value.pass;
    if(this.isLoginMode){
    //CALL LOGIN WS
    }
    else{
    //CALL SIGNUP WS
    }
    }
    onSwitchAuthMode(){
    this.isLoginMode = !this.isLoginMode;
    }
}
