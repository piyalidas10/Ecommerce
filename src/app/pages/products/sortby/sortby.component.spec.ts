import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortbyComponent } from './sortby.component';

describe('SortbyComponent', () => {
  let component: SortbyComponent;
  let fixture: ComponentFixture<SortbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
