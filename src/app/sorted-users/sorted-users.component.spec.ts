import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedUsersComponent } from './sorted-users.component';

describe('SortedUsersComponent', () => {
  let component: SortedUsersComponent;
  let fixture: ComponentFixture<SortedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
