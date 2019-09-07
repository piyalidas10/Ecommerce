import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('AppComponent', () => {
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    router = TestBed.get(Router);
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
