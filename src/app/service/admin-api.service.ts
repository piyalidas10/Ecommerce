import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { AppConfig } from '@ecommerce/settings/app.config';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  public headers: HttpHeaders;
  public ecommerceRQSTOptions: any;

  constructor(
    private _appConfig: AppConfig,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  setEcommerceHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Ecommerce-version': '1.0.0'
    });
    this.ecommerceRQSTOptions = {
      headers: this.headers,
      responseType: 'json'
    };
  }

  /**
   * Get customers registrations in year
  */
  getCustomers(): Observable<any> {
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CUSTOMERSBYYEAR}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Get customers genderwise
  */
  getCustomersByGender(): Observable<any> {
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CUTOMERSBYGENDER}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Get products category wise
  */
 getProductsByCategory(): Observable<any> {
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_PRODUCTSBYCATEGORY}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }


}
