import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPurchaseOrderComponent } from './print-purchase-order.component';

describe('PrintPurchaseOrderComponent', () => {
  let component: PrintPurchaseOrderComponent;
  let fixture: ComponentFixture<PrintPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
