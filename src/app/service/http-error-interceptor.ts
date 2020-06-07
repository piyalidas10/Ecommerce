import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@ecommerce/auth/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          // Server Side Error
          if (error instanceof HttpErrorResponse) {
            console.log('error', error);
           return throwError(error);
          } else {  // Client Side Error
            return throwError(error);
          }
        })
      );
  }
}
