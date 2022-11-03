import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventoryAdjustmentComponent } from './list-inventory-adjustment.component';

describe('ListInventoryAdjustmentComponent', () => {
  let component: ListInventoryAdjustmentComponent;
  let fixture: ComponentFixture<ListInventoryAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInventoryAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
