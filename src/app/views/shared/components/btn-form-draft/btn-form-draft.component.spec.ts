import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFormDraftComponent } from './btn-form-draft.component';

describe('BtnFormDraftComponent', () => {
  let component: BtnFormDraftComponent;
  let fixture: ComponentFixture<BtnFormDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFormDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnFormDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
