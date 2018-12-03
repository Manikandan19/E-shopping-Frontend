import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAdminComponent } from './add-update-admin.component';

describe('AddUpdateAdminComponent', () => {
  let component: AddUpdateAdminComponent;
  let fixture: ComponentFixture<AddUpdateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
