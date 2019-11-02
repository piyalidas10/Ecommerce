import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { AuthService } from './auth.service';

  @Injectable()
  export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.authService.getIsAuth();
      console.log('isAuth => ', isAuth);
      console.log('route => ', state.url);
      if (isAuth) {
        if (state.url === '/login' || state.url === '/register') {
            this.router.navigate(['/home']);
          }
      }
      return true;
    }
  }
