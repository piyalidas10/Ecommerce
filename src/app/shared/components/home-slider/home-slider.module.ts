import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeSliderModule { }
