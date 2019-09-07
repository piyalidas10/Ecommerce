import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { ILogin } from '../modules/login';
import { IRegister } from '../modules/register';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  public token: string;
  public custEmail: string;
  public custName: string;
  private tokenTimer: any;
  public loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
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
    return this.custName;
  }

  getLoggedInStatusListener() {
    return this.loggedInStatus.asObservable();
  }

  createCustomer(registerVal: {firstName, middleName, lastName, emailId, mobile, password}): Observable<IRegister> {
      const authData = { customerFirstName: registerVal.firstName, customerMiddleName: registerVal.middleName,
        customerLastName: registerVal.lastName, customerEmail: registerVal.emailId,
        customerMobile: registerVal.mobile, customerPass: registerVal.password};
      const apiURL = `${BACKEND_URL}${environment.API_REGISTER_PATH}`;
      return this.http.post<any>(apiURL, authData)
            .pipe(map(response => {
                return response;
            }));
  }

  loginCustomer(emailId, password): Observable<any> {
            const authData = { customerEmail: emailId, customerPass: password };
            const apiURL = `${BACKEND_URL}${environment.API_LOGIN_PATH}`;
            return this.http.post<any>(apiURL, authData)
            .pipe(map((res: Response) => {
              this.isAuthenticated = true;
              this.loggedInStatus.next(true);
              return res;
            }));
  }

  saveAuthData(token: string, expirationDate: Date, custEmail: string, custName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('custEmail', custEmail);
    localStorage.setItem('custName', custName);
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
      this.custName = authInformation.custName;
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
    const custName = localStorage.getItem('custName');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      custEmail: custEmail,
      custName: custName
    };
  }

  logout(): void {
    this.token = null;
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
    localStorage.removeItem('custName');
  }

}
