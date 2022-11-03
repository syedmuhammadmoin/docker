import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillDetailComponent } from './vendor-bill-detail.component';

describe('VendorBillDetailComponent', () => {
  let component: VendorBillDetailComponent;
  let fixture: ComponentFixture<VendorBillDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
