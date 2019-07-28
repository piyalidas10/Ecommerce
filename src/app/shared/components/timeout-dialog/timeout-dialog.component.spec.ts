import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutDialogComponent } from './timeout-dialog.component';

describe('TimeoutDialogComponent', () => {
  let component: TimeoutDialogComponent;
  let fixture: ComponentFixture<TimeoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
