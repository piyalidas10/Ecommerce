import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { SortbyComponent } from '../sortby/sortby.component';
import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component';

import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { Ng5SliderModule } from 'ng5-slider';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductListComponent,
    SortbyComponent,
    SidebarFilterComponent,
    TruncatePipe
  ]
})
export class ProductListModule { }
