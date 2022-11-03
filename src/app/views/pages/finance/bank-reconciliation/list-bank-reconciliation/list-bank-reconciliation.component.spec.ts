import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankReconciliationComponent } from './list-bank-reconciliation.component';

describe('ListBankReconciliationComponent', () => {
  let component: ListBankReconciliationComponent;
  let fixture: ComponentFixture<ListBankReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBankReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBankReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
