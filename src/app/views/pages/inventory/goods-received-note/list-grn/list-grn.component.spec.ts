import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGrnComponent } from './list-grn.component';

describe('ListGrnComponent', () => {
  let component: ListGrnComponent;
  let fixture: ComponentFixture<ListGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
