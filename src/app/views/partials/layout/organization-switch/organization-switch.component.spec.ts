import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSwitchComponent } from './organization-switch.component';

describe('OrganizationSwitchComponent', () => {
  let component: OrganizationSwitchComponent;
  let fixture: ComponentFixture<OrganizationSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
