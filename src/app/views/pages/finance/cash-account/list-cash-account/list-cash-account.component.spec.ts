import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCashAccountComponent } from './list-cash-account.component';

describe('ListCashAccountComponent', () => {
  let component: ListCashAccountComponent;
  let fixture: ComponentFixture<ListCashAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCashAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCashAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
