import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(
    private loginService: LoginService,
   private router: Router,
  ){}

  canLoad(route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loginService.usuarioLoggedo){
    this.router.navigateByUrl('/inicio');
    }
    return this.loginService.usuarioLoggedo;
    }
}
