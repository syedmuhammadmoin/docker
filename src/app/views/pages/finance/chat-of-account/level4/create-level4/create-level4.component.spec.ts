import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLevel4Component } from './create-level4.component';

describe('CreateLevel4Component', () => {
  let component: CreateLevel4Component;
  let fixture: ComponentFixture<CreateLevel4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLevel4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLevel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
