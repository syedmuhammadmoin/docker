import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaGridComponent } from './ra-grid.component';

describe('RaGridComponent', () => {
  let component: RaGridComponent;
  let fixture: ComponentFixture<RaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
