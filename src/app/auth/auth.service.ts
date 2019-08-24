import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Subject } from 'rxjs';
import { AppConfig } from '../settings/app.config';
import { Router, ActivationEnd } from '@angular/router';
import { ILogin } from '../modules/login';
import { IRegister } from '../modules/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInStatus = new BehaviorSubject<boolean>(false);
  public loggedInUser = new BehaviorSubject<ILogin>(<ILogin>{});

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router
  ) { }

  createCustomer(registerVal: {firstName, middleName, lastName, emailId, mobile, password}): Observable<IRegister> {
      const authData = { customerFirstName: registerVal.firstName, customerMiddleName: registerVal.middleName,
        customerLastName: registerVal.lastName, customerEmail: registerVal.emailId,
        customerMobile: registerVal.mobile, customerPass: registerVal.password};
      const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_REGISTER_PATH}`;
      return this.http.post<any>(apiURL, authData)
            .pipe(map(response => {
                localStorage.setItem('token', response.emailId);
                localStorage.setItem('isLoggedIn', 'true');
                this.loggedInStatus.next(true);
                return response;
            }));
  }

  loginCustomer(emailId, password): Observable<any> {
            const authData = { customerEmail: emailId, customerPass: password};
            const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_LOGIN_PATH}`;
            return this.http.post<any>(apiURL, authData)
            .pipe(map((res: Response) => {
              console.log('Login response => ', res);
              // if (res) {
              //   localStorage.setItem('isLoggedIn', 'true');
              //   localStorage.setItem('token', res);
              //   this.loggedInStatus.next(true);
              // }
              return res;
            }));
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
  }

}
