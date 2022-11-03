import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintPurchaseRequisitionComponent} from './print-purchase-requisition.component';

describe('PrintPurchaseOrderComponent', () => {
  let component: PrintPurchaseRequisitionComponent;
  let fixture: ComponentFixture<PrintPurchaseRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintPurchaseRequisitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPurchaseRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
