import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnblockRequestsComponent } from './manage-unblock-requests.component';

describe('ManageUnblockRequestsComponent', () => {
  let component: ManageUnblockRequestsComponent;
  let fixture: ComponentFixture<ManageUnblockRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUnblockRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnblockRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
