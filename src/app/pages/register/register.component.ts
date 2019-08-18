import { Component, OnInit, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APIService } from '../../service/api.service';
import { SharedService } from '../../service/shared.service';
import { MessageService } from '../../service/message.service';
import { AuthService } from '../../auth/auth.service';
import { ValidationMessageService } from '../../service/validation-msg.service';
import { IRegister } from '../../modules/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorData: any;
  isLoading: Boolean = true;

  constructor(
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private sharedService: SharedService,
    private msgService: MessageService,
    private authService: AuthService,
    private el: ElementRef,
    private validErrorMsgService: ValidationMessageService
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(event['snapshot'].data['title']);
      });
  }

  ngOnInit() {
    this.createForm();
    this.validationErrorMsg();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  verifyForm() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    console.log(invalidElements, invalidElements.length);
    if (invalidElements.length > 0) {
      console.log(invalidElements[0]);
      invalidElements[0].focus();
    } else {
      this.register({value: this.registerForm.value, valid: true});
    }
  }

  register({ value, valid }: { value: IRegister, valid: boolean }) {
      console.log('Form submitted!');
      console.log(this.registerForm.value);
      this.authService.createCustomer(this.registerForm.value)
          .pipe()
          .subscribe(
              data => {
                  this.msgService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                console.log('Registration error => ', error.error.message);
                  this.msgService.error(error.error.message, true);
                  this.isLoading = false;
              });
  }

  /*
  *** Get API response as validation error json and load response in validationErrorObj of validErrorMsgService
  */
  validationErrorMsg() {
    this.apiService.getValidationErrorMessage().then(
      (res) => {
        if (this.validErrorMsgService.validationErrorObj.length === 0) {
          this.validErrorMsgService.validationErrorObj = res['vlderrors'][0]['validationErrors'];
          console.log('Validation Error => ', this.validErrorMsgService.validationErrorObj);
          this.isLoading = false;
        }
      }, (error) => {
        this.errorData = this.sharedService.getErrorKeys(error.statusText);
        this.isLoading = false;
      });
  }

}
