import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details.component';
import { ProductModule } from '../products.module';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductDetailsComponent
  ]
})
export class ProductDetailsModule { }
