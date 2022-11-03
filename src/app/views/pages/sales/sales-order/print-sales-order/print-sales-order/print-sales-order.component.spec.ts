import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSalesOrderComponent } from './print-sales-order.component';

describe('PrintSalesOrderComponent', () => {
  let component: PrintSalesOrderComponent;
  let fixture: ComponentFixture<PrintSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
