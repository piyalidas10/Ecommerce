import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './service/http-error-interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppConfig } from './settings/app.config';


import { HeaderModule } from './shared/components/header/header.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { CartModule } from './shared/components/cart/cart.module';

import { APIService } from './service/api.service';
import { AuthService } from './auth/auth.service';



import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ModalDirective } from './directives/modal.directive';
import { TimeoutDialogComponent } from './shared/components/timeout-dialog/timeout-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ModalDirective,
    ModalDialogComponent,
    TimeoutDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    NavbarModule,
    CartModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    APIService,
    AppConfig,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [ModalDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
