import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AdminApiService } from '@ecommerce/service/admin-api.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HighchartsChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AdminApiService
  ]
})
export class DashboardModule { }
