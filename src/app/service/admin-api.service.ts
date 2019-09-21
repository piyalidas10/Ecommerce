import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiEndpoint;


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  public headers: HttpHeaders;
  public ecommerceRQSTOptions: any;

  constructor(
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
    const apiURL = `${BACKEND_URL}${environment.API_CUSTOMERSBYYEAR}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Get customers genderwise
  */
  getCustomersByGender(): Observable<any> {
    const apiURL = `${BACKEND_URL}${environment.API_CUTOMERSBYGENDER}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Get products category wise
  */
 getProductsByCategory(): Observable<any> {
    const apiURL = `${BACKEND_URL}${environment.API_PRODUCTSBYCATEGORY}`;
    return this.http.get(apiURL)
    .pipe(map(response => {
      return response;
    }));
  }


}
