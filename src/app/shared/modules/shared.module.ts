import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ValidationLabelDirective } from '../../directives/validation-label.directive';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ValidationLabelDirective
  ],
  declarations: [
    ValidationLabelDirective
  ],
  providers: [
  ]
})
export class SharedModule { }
