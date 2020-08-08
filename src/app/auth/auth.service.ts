import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { ILogin } from '@ecommerce/interfaces/login';
import { IRegister } from '@ecommerce/interfaces/register';
import { MessageService } from '@ecommerce/service/message.service';

import { AppConfig } from '@ecommerce/settings/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  public token: string;
  public custEmail: string;
  public custFname: string;
  public custMname: string;
  public custLname: string;
  private tokenTimer: any;
  public loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private _appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private msgService: MessageService
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getCustMail() {
    return this.custEmail;
  }

  getCustName() {
    return [this.custFname, this.custMname, this.custLname];
  }

  getLoggedInStatusListener() {
    return this.loggedInStatus.asObservable();
  }

  createCustomer(registerVal): Observable<IRegister> {
      const authData = { customerFirstName: registerVal.firstName, customerMiddleName: registerVal.middleName,
        customerLastName: registerVal.lastName, customerDOB: registerVal.dob, customerGender: registerVal.gender,
        customerEmail: registerVal.email, customerMobile: registerVal.mobile, customerPass: registerVal.password};
      const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_REGISTER_PATH}`;
      return this.http.post<any>(apiURL, authData)
            .pipe(map(response => {
              console.log('createCustomer => ', response);
                return response;
            }));
  }

  loginCustomer(cusInfo) {
            const authData = { customerEmail: cusInfo.email, customerPass: cusInfo.password };
            console.log('loginCustomer authData => ', authData);
            const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_LOGIN_PATH}`;
            return this.http.post
            <{ token: string; expiresIn: number; email: string, custFname: string, custMname: string, custLname: string }>
            (apiURL, authData)
            .subscribe(
              response => {
                console.log(response);
                const token = response.token;
                this.token = token;
                if (token) {
                  const expiresInDuration = response.expiresIn;
                  this.custEmail = response.email;
                  this.custFname = response.custFname;
                  this.custMname = response.custMname;
                  this.custLname = response.custLname;
                  this.isAuthenticated = true;
                  this.loggedInStatus.next(true);
                  const now = new Date();
                  const expirationDate = new Date(
                    now.getTime() + expiresInDuration * 1000
                  );
                  this.saveAuthData(token, expirationDate, this.custEmail, this.custFname, this.custMname, this.custLname);
                  this.router.navigate(['/home']);
                }
              },
              error => {
                this.msgService.error(error.error.message, true);
                this.loggedInStatus.next(false);
              }
            );
  }

  saveAuthData(token: string, expirationDate: Date, custEmail: string, custFname: string, custMname: string, custLname: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('custEmail', custEmail);
    localStorage.setItem('custFname', custFname);
    localStorage.setItem('custMname', custMname);
    localStorage.setItem('custLname', custLname);
  }

  autoAuthCust() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.custEmail = authInformation.custEmail;
      this.custFname = authInformation.custFname;
      this.custMname = authInformation.custMname;
      this.custLname = authInformation.custLname;
      this.setAuthTimer(expiresIn / 1000);
      this.loggedInStatus.next(true);
    }
  }

  setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const custEmail = localStorage.getItem('custEmail');
    const custFname = localStorage.getItem('custFname');
    const custMname = localStorage.getItem('custMname');
    const custLname = localStorage.getItem('custLname');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      custEmail: custEmail,
      custFname: custFname,
      custMname: custMname,
      custLname: custLname
    };
  }

  logout() {
    this.token = null;
    this.custEmail = null;
    this.custFname = null;
    this.custMname = null;
    this.custLname = null;
    this.isAuthenticated = false;
    this.loggedInStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('custEmail');
    localStorage.removeItem('custFname');
    localStorage.removeItem('custMname');
    localStorage.removeItem('custLname');
  }

}
