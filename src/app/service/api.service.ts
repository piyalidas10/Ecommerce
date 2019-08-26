import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { AppConfig } from '../settings/app.config';
import { resolve, reject } from 'q';
import { Icategories } from '../modules/categories';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  public products: {};
  public headers: HttpHeaders;
  public ecommerceRQSTOptions: any;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
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


  // getCategories(): Observable<any> {
  //   return this.http.get(AppSettings.API_CATEGORY_ENDPOINT)
  //   .pipe(catchError(this.handleError('getCategories', [])));
  // }

  /**
   * Get categories
  */
  getCategories() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_CATEGORY_PATH}`;
      return this.http.get<{categories: Icategories[]}>(apiURL).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        }
      );
    });
    return promise;
  }


  /**
   * Get site content
  */
 getContent() {
  // tslint:disable-next-line:no-shadowed-variable
  const promise = new Promise((resolve, reject) => {
    const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_CONTENT_PATH}`;
    return this.http.get<{content: any}>(apiURL).toPromise().then(
      res => {
        resolve(res);
      },
      msg => {
        reject(msg);
      }
    );
  });
  return promise;
}

/**
   * Get error message
  */
 getErrorMessage() {
   // tslint:disable-next-line:no-shadowed-variable
  const promise = new Promise((resolve, reject) => {
    const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.ERROR_MSG_PATH}`;
    return this.http.get<{srverrors: any}>(apiURL).toPromise().then(
      res => {
        resolve(res);
      },
      msg => {
        reject(msg);
      }
    );
  });
  return promise;
 }


 /**
   * Get Form validation error message
  */
 getValidationErrorMessage() {
  // tslint:disable-next-line:no-shadowed-variable
 const promise = new Promise((resolve, reject) => {
   const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.VALIDATION_ERROR_MSG_PATH}`;
   return this.http.get<{vlderrors: any}>(apiURL).toPromise().then(
     res => {
       resolve(res);
     },
     msg => {
       reject(msg);
     }
   );
 });
 return promise;
}


  /**
   * Get products
  */
  getProducts(cat: string): Observable<any> {
    const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}` + '/?cat=';
    return this.http.get(apiURL, this.ecommerceRQSTOptions);
    // .pipe(catchError(this.handleError('getProducts', [])));
  }

  /**
   * Get product details
  */
  getProductDetails(id: string): Observable<any> {
      const apiURL = `${this.appConfig.protocol}${this.appConfig.apiEndpoint}${this.appConfig.API_PRODUCT_LIST_PATH}` + '/?id=';
      return this.http.get(apiURL, this.ecommerceRQSTOptions);
      // .pipe(catchError(this.handleError('getProductDetails', [])));
  }



  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // /** Log a Service message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`API Service: ${message}`);
  // }


}
