import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '@ecommerce/auth/auth.service';
import { LoaderService } from '@ecommerce/service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
    },
    (err: any) => {
          this.hideLoader();
    }));
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
