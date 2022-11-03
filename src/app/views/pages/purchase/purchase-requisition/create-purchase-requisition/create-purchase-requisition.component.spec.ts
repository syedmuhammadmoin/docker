import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePurchaseRequisitionComponent} from './create-purchase-requisition.component';

describe('CreatePurchaseOrderComponent', () => {
  let component: CreatePurchaseRequisitionComponent;
  let fixture: ComponentFixture<CreatePurchaseRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePurchaseRequisitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
