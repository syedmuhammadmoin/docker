import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaleOrderComponent } from './list-sale-order.component';

describe('ListSaleOrderComponent', () => {
  let component: ListSaleOrderComponent;
  let fixture: ComponentFixture<ListSaleOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSaleOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSaleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
