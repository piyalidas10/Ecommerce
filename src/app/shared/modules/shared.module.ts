import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidationLabelDirective } from '../../directives/validation-label.directive';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidationLabelDirective
  ],
  declarations: [
    ValidationLabelDirective
  ],
  providers: [
  ]
})
export class SharedModule { }
