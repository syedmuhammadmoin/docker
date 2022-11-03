import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFormActionsComponent } from './btn-form-actions.component';

describe('BtnFormActionsComponent', () => {
  let component: BtnFormActionsComponent;
  let fixture: ComponentFixture<BtnFormActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFormActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
