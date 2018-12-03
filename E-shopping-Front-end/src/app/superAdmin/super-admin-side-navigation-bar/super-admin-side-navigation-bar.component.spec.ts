import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSideNavigationBarComponent } from './super-admin-side-navigation-bar.component';

describe('SuperAdminSideNavigationBarComponent', () => {
  let component: SuperAdminSideNavigationBarComponent;
  let fixture: ComponentFixture<SuperAdminSideNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminSideNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminSideNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
