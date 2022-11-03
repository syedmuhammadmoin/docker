import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGridComponent } from './btn-grid.component';

describe('BtnGridComponent', () => {
  let component: BtnGridComponent;
  let fixture: ComponentFixture<BtnGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
