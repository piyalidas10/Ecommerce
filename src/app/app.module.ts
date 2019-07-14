import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppConfig } from './settings/app.config';


import { HeaderComponent } from './shared/components/header/header.component';


import { APIService } from './service/api.service';
import { CartComponent } from './shared/components/cart/cart.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    NavbarComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [APIService, AppConfig],
  entryComponents: [ModalDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
