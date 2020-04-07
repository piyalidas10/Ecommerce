import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from '../../service/message.service';
import { Observable, of } from 'rxjs';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let router: Router;

  beforeEach(async(() => {
    const authSrvStub = {
      createCustomer: () => {}
    };
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: authSrvStub },
        MessageService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('firstname field validity', () => {
    let errors = {};
    const firstName = component.registerForm.controls['firstName'];

    // firsname field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set firsname to something
    firstName.setValue('p');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    // Set firsname to something
    firstName.setValue('ppppppppppppppppppppppppppppppp');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeTruthy();

    // Set firsname to something correct
    firstName.setValue('piyali');
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeFalsy();
  });

  it('middlename field validity', () => {
    let errors = {};
    const middleName = component.registerForm.controls['middleName'];

    // Set middlename to something
    middleName.setValue('p');
    errors = middleName.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    // Set middlename to something
    middleName.setValue('ppppppppppppppppppppppppppppppp');
    errors = middleName.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeTruthy();

    // Set middlename to something correct
    middleName.setValue('piyali');
    errors = middleName.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeFalsy();
  });

  it('lastname field validity', () => {
    let errors = {};
    const lastName = component.registerForm.controls['lastName'];

    // lastname field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set lastname to something
    lastName.setValue('p');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    // Set lastname to something
    lastName.setValue('ppppppppppppppppppppppppppppppp');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeTruthy();

    // Set lastname to something correct
    lastName.setValue('piyali');
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeFalsy();
  });

  it('emailId field validity', () => {
      let errors = {};
      const emailId = component.registerForm.controls['emailId'];
      expect(emailId.valid).toBeFalsy();

      // emailId field is required
      errors = emailId.errors || {};
      expect(errors['required']).toBeTruthy();

      // Set emailId to something
      emailId.setValue('test');
      errors = emailId.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();

      // Set emailId to something correct
      emailId.setValue('test@example.com');
      errors = emailId.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
  });

  it('mobile field validity', () => {
    let errors = {};
    const mobile = component.registerForm.controls['mobile'];
    expect(mobile.valid).toBeFalsy();

    // mobile field is required
    errors = mobile.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set mobile to something
    mobile.setValue('test');
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    // Set mobile to something
    mobile.setValue('1234');
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    // Set mobile to something correct
    mobile.setValue('1234567890');
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxLength']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.registerForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue('12345');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set password to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue('piyali');
    component.registerForm.controls['middleName'].setValue('fdd');
    component.registerForm.controls['lastName'].setValue('das');
    component.registerForm.controls['emailId'].setValue('test@test.com');
    component.registerForm.controls['mobile'].setValue('1234567890');
    component.registerForm.controls['password'].setValue('123456');
    expect(component.registerForm.valid).toBeTruthy();
    component.register(component.registerForm.value);
  });

  it('register function call', fakeAsync(() => {
    const authSrv = fixture.debugElement.injector.get(AuthService);
    const msgSrv = fixture.debugElement.injector.get(MessageService);
    spyOn(authSrv, 'createCustomer').and.returnValue('data');
    spyOn(msgSrv, 'success').and.returnValue({ subscribe: () => {} });
    spyOn(msgSrv, 'error').and.returnValue({ subscribe: () => {} });
    expect(authSrv.createCustomer).toHaveBeenCalled();
    expect(msgSrv.success).toHaveBeenCalled();
    expect(msgSrv.error).toHaveBeenCalled();
  }));

});
