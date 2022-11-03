import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorBillComponent } from './create-vendor-bill.component';

describe('CreateVendorBillComponent', () => {
  let component: CreateVendorBillComponent;
  let fixture: ComponentFixture<CreateVendorBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
