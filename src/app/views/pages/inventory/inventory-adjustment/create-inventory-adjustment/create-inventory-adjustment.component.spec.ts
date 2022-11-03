import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryAdjustmentComponent } from './create-inventory-adjustment.component';

describe('CreateInventoryAdjustmentComponent', () => {
  let component: CreateInventoryAdjustmentComponent;
  let fixture: ComponentFixture<CreateInventoryAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInventoryAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
