import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [NavbarComponent],
  declarations: [
    NavbarComponent
  ]
})
export class NavbarModule { }
