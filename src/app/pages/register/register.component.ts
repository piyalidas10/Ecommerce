import { Component, OnInit, OnChanges, ElementRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { PlatformConfig } from '@ecommerce/settings/platform.config';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { APIService } from '@ecommerce/service/api.service';
import { SharedService } from '@ecommerce/service/shared.service';
import { MessageService } from '@ecommerce/service/message.service';
import { AuthService } from '@ecommerce/auth/auth.service';
import { IRegister } from '@ecommerce/interfaces/register';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges, OnDestroy {
  registerForm: FormGroup;
  errorData: any;
  isLoading: Boolean = true;
  registerService: Subscription;
  content = [];
  formFields = [];

  constructor(
    private _platformConfig: PlatformConfig,
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private sharedService: SharedService,
    private msgService: MessageService,
    private authService: AuthService,
    private el: ElementRef
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(event['snapshot'].data['title']);
      });
  }

  ngOnInit() {
    if (this._platformConfig.isBrowser) {
      this.siteContent();
    }
  }

  ngOnChanges() {}

  async siteContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.sharedService.content.
        subscribe(
          (res) => {
            this.content = res['registerPage'];
            this.formFields = this.content['formFields'];
            console.log('Register Page Content => ', this.content);
            this.isLoading = false;
          }
        );
    } catch (error) {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      console.log(this.errorData);
    }
  }

  getFormValue(formVal) {
    console.log('Register Form Value => ', formVal);
    this.register({value: formVal, valid: true});
  }

  register({ value, valid }: { value: IRegister, valid: boolean }) {
      this.registerService = this.authService.createCustomer(value)
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

  ngOnDestroy() {
    // this.registerService.unsubscribe();
  }

}
