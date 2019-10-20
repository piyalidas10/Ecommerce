import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartPriceComponent } from './cart-price/cart-price.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [CartComponent],
  declarations: [
    CartComponent,
    CartDetailsComponent,
    CartPriceComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CartModule { }
