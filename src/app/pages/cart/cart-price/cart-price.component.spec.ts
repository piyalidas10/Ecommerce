import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPriceComponent } from './cart-price.component';

describe('CartPriceComponent', () => {
  let component: CartPriceComponent;
  let fixture: ComponentFixture<CartPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
