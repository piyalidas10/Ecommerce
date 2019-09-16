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

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Get customers registrations in year
  */
  getCustomers(): Observable<any> {
    const apiURL = `${BACKEND_URL}${environment.API_CUSTOMERSBYYEAR}`;
    return this.http.get(apiURL)
    .pipe(catchError(this.handleError('getCustomers', [])));
  }

  getCustomersByGender(): Observable<any> {
    const apiURL = `${BACKEND_URL}${environment.API_CUTOMERSBYGENDER}`;
    return this.http.get(apiURL)
    .pipe(catchError(this.handleError('getCustomersByGender', [])));
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service message with the MessageService */
  private log(message: string) {
    this.messageService.error(`API Service: ${message}`);
  }

}
