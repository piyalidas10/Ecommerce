import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ValidationMessageService } from '../../service/validation-msg.service';
import { ValidationLabelDirective } from '../../directives/validation-label.directive';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterComponent,
    ValidationLabelDirective
  ],
  providers: [
    ValidationMessageService
  ]
})
export class RegisterModule { }
