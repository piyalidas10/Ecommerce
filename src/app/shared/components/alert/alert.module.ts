import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AlertComponent } from './alert.component';

const routes: Routes = [
  {
    path: '',
    component: AlertComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [AlertComponent],
  declarations: [
    AlertComponent
  ]
})
export class AlertModule { }
