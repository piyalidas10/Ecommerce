import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagenotfoundComponent]
})
export class PagenotfoundModule { }
