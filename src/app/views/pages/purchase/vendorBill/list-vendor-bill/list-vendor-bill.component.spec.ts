import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVendorBillComponent } from './list-vendor-bill.component';

describe('ListVendorBillComponent', () => {
  let component: ListVendorBillComponent;
  let fixture: ComponentFixture<ListVendorBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVendorBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVendorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
