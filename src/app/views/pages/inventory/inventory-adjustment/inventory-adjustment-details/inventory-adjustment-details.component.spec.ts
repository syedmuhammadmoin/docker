import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAdjustmentDetailsComponent } from './inventory-adjustment-details.component';

describe('InventoryAdjustmentDetailsComponent', () => {
  let component: InventoryAdjustmentDetailsComponent;
  let fixture: ComponentFixture<InventoryAdjustmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAdjustmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAdjustmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
