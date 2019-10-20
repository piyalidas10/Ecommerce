import { Component, OnInit, OnChanges, ElementRef, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges, OnDestroy {
  registerForm: FormGroup;
  errorData: any;
  isLoading: Boolean = true;
  registerService: Subscription;

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

  ngOnChanges() {}

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      middleName: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dob: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[^ @]*@[^ @]*')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), , Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  verifyForm() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    } else {
      console.log('Registration details => ', this.registerForm.value);
      this.register({value: this.registerForm.value, valid: true});
    }
  }

  register({ value, valid }: { value: IRegister, valid: boolean }) {
      this.registerService = this.authService.createCustomer(this.registerForm.value)
          .pipe()
          .subscribe(
              data => {
                  this.msgService.success(data['message'], true);
                  this.router.navigate(['/login']);
              },
              error => {
                  console.log('Registration error => ', error.error.message);
                  this.authService.loggedInStatus.next(false);
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

  ngOnDestroy() {
    // this.registerService.unsubscribe();
  }

}
