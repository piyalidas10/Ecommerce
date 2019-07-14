import { Injectable } from '@angular/core';
import { ILogin } from '../modules/login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInStatus = new BehaviorSubject<boolean>(false);
  public loggedInUser = new BehaviorSubject<ILogin>(<ILogin>{});

  constructor(private http: HttpClient) { }

  login(umail, password): Observable<object> {
        /* For API use only */
            // return this.http.post<any>('login', {username, password})
            // .pipe(map((res: Response) => {
            //   console.log('response', username);
            //   if (res) {
            //     localStorage.setItem('isLoggedIn', 'true');
            //     localStorage.setItem('token', username);
            //   }
            //   return res;
            // }));

        /* for static data */
        // tslint:disable-next-line:no-unused-expression
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', umail);
            this.loggedInStatus.next(true);
            this.loggedInUser.next(umail);
            console.log('piyali');
            return of(umail);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
  }

}
