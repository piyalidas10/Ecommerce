import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddproductComponent } from './addproduct.component';

const routes: Routes = [
  {
    path: '',
    component: AddproductComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddproductComponent]
})
export class AddproductModule { }
