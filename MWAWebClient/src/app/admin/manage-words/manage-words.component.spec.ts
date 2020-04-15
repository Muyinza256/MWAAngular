import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWordsComponent } from './manage-words.component';

describe('ManageWordsComponent', () => {
  let component: ManageWordsComponent;
  let fixture: ComponentFixture<ManageWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
