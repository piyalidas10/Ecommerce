import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule { }
