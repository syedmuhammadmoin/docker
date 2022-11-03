import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaGridSelectComponent } from './ra-grid-select.component';

describe('RaGridSelectComponent', () => {
  let component: RaGridSelectComponent;
  let fixture: ComponentFixture<RaGridSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaGridSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
