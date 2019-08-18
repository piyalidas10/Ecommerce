import { Injectable } from '@angular/core';
import { ILogin } from '../modules/login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Subject } from 'rxjs';
import { AppConfig } from '../settings/app.config';
import { Router, ActivationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInStatus = new BehaviorSubject<boolean>(false);
  public loggedInUser = new BehaviorSubject<ILogin>(<ILogin>{});
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router
  ) { }

  createCustomer(
    registerVal: {firstName: String, middleName: String, lastName: String, emailId: String, mobile: String, password: String}
  ): Observable<any> {
      const authData = { customerFirstName: registerVal.firstName, customerMiddleName: registerVal.middleName,
        customerLastName: registerVal.lastName, customerEmail: registerVal.emailId,
        customerMobile: registerVal.mobile, customerPass: registerVal.password};
      const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_CUSTOMERS_PATH}`;
      return this.http.post<any>(apiURL, authData)
            .pipe(map(response => {
                localStorage.setItem('token', response.emailId);
                localStorage.setItem('isLoggedIn', 'true');
                this.authStatusListener.next(false);
                return response;
            }));
  }

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
