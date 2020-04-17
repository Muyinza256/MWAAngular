import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersItemComponent } from './manage-users-item.component';

describe('ManageUsersItemComponent', () => {
  let component: ManageUsersItemComponent;
  let fixture: ComponentFixture<ManageUsersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
