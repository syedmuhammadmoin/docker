import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchaseRequisitionDetailComponent} from './purchase-requisition-detail.component';

describe('PurchaseOrderDetailComponent', () => {
  let component: PurchaseRequisitionDetailComponent;
  let fixture: ComponentFixture<PurchaseRequisitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseRequisitionDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequisitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
