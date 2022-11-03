import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCashAccountComponent } from './create-cash-account.component';

describe('CreateCashAccountComponent', () => {
  let component: CreateCashAccountComponent;
  let fixture: ComponentFixture<CreateCashAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCashAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCashAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
