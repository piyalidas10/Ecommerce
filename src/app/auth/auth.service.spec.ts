import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router, ActivationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('AuthService', () => {
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: Router, useClass: RouterStub}
      ]
    });
    router = TestBed.get(Router);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
