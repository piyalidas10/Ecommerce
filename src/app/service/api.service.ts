import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { resolve, reject } from 'q';
import { Icategories } from '../modules/categories';

import { AppConfig } from '../settings/app.config';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  public products: {};
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
      const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CATEGORY_PATH}`;
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
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CONTENT_PATH}`;
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
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.ERROR_MSG_PATH}`;
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
//  getValidationErrorMessage() {
//   // tslint:disable-next-line:no-shadowed-variable
//  const promise = new Promise((resolve, reject) => {
//    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.VALIDATION_ERROR_MSG_PATH}`;
//    return this.http.get<{vlderrors: any}>(apiURL).toPromise().then(
//      res => {
//        resolve(res);
//      },
//      msg => {
//        reject(msg);
//      }
//    );
//  });
//  return promise;
// }


  /**
   * Get products by Category
  */
  getProducts(cat: string): Observable<any> {
    const authData = {category : cat};
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_PRODUCT_LIST_PATH}`;
    return this.http.post(apiURL, authData)
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Get product details
  */
  getProductDetails(id: string): Observable<any> {
      const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_PRODUCT_DETAILS_PATH}`;
      const authData = {productid : id};
      return this.http.post(apiURL, authData)
      .pipe(map(response => {
        return response;
      }));
  }


  /**
   * Check product availability in cart
  */
 isAvailableInCart(email): Observable<any> {
  const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CART_CHECK_PRODUCT}`;
  const authData = {email: email};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}


  /**
   * Add to cart details
  */
 addToCart(sessionInfoDt, productInfoDt): Observable<any> {
    const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CART_PATH}`;
    const authData = {sessionInfo: sessionInfoDt, productsInfo: productInfoDt};
    return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
    .pipe(map(response => {
      return response;
    }));
 }


 /**
   * Add product quantity to buy
  */
 productAddToBuy(email, id, price, qty): Observable<any> {
  const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CART_ADD_PRODUCT_QUANTITY}`;
  const authData = {email: email, id: id, price: price, qty: qty};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}


 /**
   * Delete product quantity to buy
  */
 productDeleteToBuy(email, id, price, qty): Observable<any> {
  const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CART_DELETE_PRODUCT_QUANTITY}`;
  const authData = {email: email, id: id, price: price, qty: qty};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}

 /**
   * Remoe product from cart
  */
 productRemoveFromCart(email, id): Observable<any> {
  const apiURL = `${this._appConfig.apiEndpoint}${this._appConfig.API_CART_REMOVE_PRODUCT}`;
  const authData = {email: email, id: id};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
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
