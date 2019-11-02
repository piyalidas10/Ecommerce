import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemenuComponent } from './profilemenu.component';

describe('ProfilemenuComponent', () => {
  let component: ProfilemenuComponent;
  let fixture: ComponentFixture<ProfilemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
