import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDropdownComponent } from './group-dropdown.component';

describe('GroupDropdownComponent', () => {
  let component: GroupDropdownComponent;
  let fixture: ComponentFixture<GroupDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
