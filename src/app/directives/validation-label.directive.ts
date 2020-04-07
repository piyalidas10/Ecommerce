import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ecommerce-validation-label]'
})
export class ValidationLabelDirective implements OnInit {

  constructor(private elRef: ElementRef,
    private control: NgControl
  ) { }

  @Input('formControlName') formControlName: string;
  errorSpanId = '';
  statusChangeSubscription: Subscription;

  ngOnInit(): void {
    this.errorSpanId = this.formControlName + '-error';
    this.statusChangeSubscription = this.control.statusChanges.subscribe(
      (status) => {
        if (status === 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent(event) {
    // This is needed to handle the case of clicking a required field and moving out.
    // Rest all are handled by status change subscription
    console.log(event);
    if (this.control.value === null || this.control.value === '') {
      if (this.control.errors) {
        this.showError();
      } else {
        this.removeError();
      }
    }
  }

  private showError() {
    this.removeError();
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    console.log('firstKey => ', firstKey);
    const errorMsgKey = this.formControlName + '-' + firstKey;
    const errorMsg = '';
    const errSpan = '<span style="color:red;" id="' + this.errorSpanId + '">' + errorMsg + '</span>';
    this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errSpan);
    this.elRef.nativeElement.classList.add('is-invalid');
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      this.elRef.nativeElement.classList.remove('is-invalid');
      errorElement.remove();
    }
  }

}
