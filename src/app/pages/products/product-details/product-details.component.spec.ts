import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';
import { of } from 'rxjs';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let debugElement: DebugElement;
  let mockParams, mockActivatedRoute;
  let element: HTMLElement;

  beforeEach(async(() => {
    mockParams = of<Params>({ id: '3' });
    mockActivatedRoute = { params: mockParams };
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });


});
