import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLevel3Component } from './create-level3.component';

describe('CreateLevel3Component', () => {
  let component: CreateLevel3Component;
  let fixture: ComponentFixture<CreateLevel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLevel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
