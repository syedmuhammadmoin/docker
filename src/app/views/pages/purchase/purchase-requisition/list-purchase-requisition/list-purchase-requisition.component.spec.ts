import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListPurchaseRequisitionComponent} from './list-purchase-requisition.component';

describe('ListPurchaseOrderComponent', () => {
  let component: ListPurchaseRequisitionComponent;
  let fixture: ComponentFixture<ListPurchaseRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPurchaseRequisitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchaseRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
