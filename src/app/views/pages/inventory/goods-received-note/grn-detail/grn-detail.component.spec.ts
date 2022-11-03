import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnDetailComponent } from './grn-detail.component';

describe('GrnDetailComponent', () => {
  let component: GrnDetailComponent;
  let fixture: ComponentFixture<GrnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
