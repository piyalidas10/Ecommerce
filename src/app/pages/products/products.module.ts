import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng5SliderModule } from 'ng5-slider';
import { CurrencyPipe } from '@ecommerce/pipe/currency.pipe';
import { TruncatePipe } from '@ecommerce/pipe/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CurrencyPipe,
    TruncatePipe,
    Ng5SliderModule
  ],
  declarations: [
    CurrencyPipe,
    TruncatePipe
  ]
})
export class ProductModule { }
