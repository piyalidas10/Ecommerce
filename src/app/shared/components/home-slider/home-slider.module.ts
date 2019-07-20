import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { HomeSliderComponent } from './home-slider.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSliderComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [HomeSliderComponent],
  declarations: [
    HomeSliderComponent
  ]
})
export class HomeSliderModule { }
