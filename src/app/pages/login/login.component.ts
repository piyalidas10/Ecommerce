import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ILogin } from '../../modules/login';
import { AuthService } from '../../auth/auth.service';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: {};
  model: ILogin = { umail: 'admin', password: 'admin123' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted = false;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(event['snapshot'].data['title']);
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      umail: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/';
    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.f.umail.value === this.model.umail && this.f.password.value === this.model.password) {
        this.authService.login(this.f.umail.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.message = error;
            });
      } else {
        this.message = 'Please check your umail and password';
      }
  }
}

}
