/* eslint-disable @typescript-eslint/semi */
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
@Injectable({
 providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  //Inyeccion de dependencias
 constructor(
 private loginService: LoginService,
 private router: Router
 ){}
//Sirve para evitar que la aplicación
//cargue los módulos si el usuario no está autorizado a hacerlo
//se redirecciona al login
canLoad(
  route: Route,
  segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.loginService.usuarioLoggeado.pipe(
  take(1),
  tap(isAuth => {
  console.log(this.loginService.usuarioLoggeado);
  if(!this.loginService.usuarioLoggeado){
  this.router.navigateByUrl('/log-in');
  }  })  );  }
}
