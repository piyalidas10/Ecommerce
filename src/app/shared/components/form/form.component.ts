import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'ecommerce-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formFields;
  @Input() formName: FormGroup;
  @Input() btnName;
  @Output() formValue = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formName = new FormGroup({});
    this.formFields.forEach(element => {
      const validatorsArr: ValidatorFn[] = [];
      if (element.valids.length > 0) {

        element.valids.forEach(val => {
          if (val.valid === 'required' || val.valid === 'email') {
            validatorsArr.push(Validators[val.valid]);
          }
          if (val.valid === 'pattern') {
            validatorsArr.push(
              Validators.pattern(val.validator)
            );
         }
         if (val.valid === 'minlength') {
            validatorsArr.push(
              Validators.minLength(val.length)
            );
          }
        });

        this.formName.addControl(element.key, new FormControl('', validatorsArr));
      } else {
        this.formName.addControl(element.key, new FormControl(''));
      }
      console.log('validatorsArr => ', validatorsArr);
    });
  }

  verifyForm() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    } else {
      console.log('Form details => ', this.formName.value);
      this.formValue.emit(this.formName.value);
    }
  }

}
