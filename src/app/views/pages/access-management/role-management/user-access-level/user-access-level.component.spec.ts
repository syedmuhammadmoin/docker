import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessLevelComponent } from './user-access-level.component';

describe('UserAccessLevelComponent', () => {
  let component: UserAccessLevelComponent;
  let fixture: ComponentFixture<UserAccessLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccessLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
