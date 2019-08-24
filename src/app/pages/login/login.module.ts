import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageService } from '../../service/validation-msg.service';
import { LoginComponent } from './login.component';
import { ValidationLabelDirective } from '../../directives/validation-label.directive';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
    LoginComponent,
    ValidationLabelDirective
  ],
  providers: [
    ValidationMessageService
  ]
})
export class LoginModule { }
