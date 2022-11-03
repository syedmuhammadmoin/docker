import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaGridOfflineComponent } from './ra-grid-offline.component';

describe('RaGridOfflineComponent', () => {
  let component: RaGridOfflineComponent;
  let fixture: ComponentFixture<RaGridOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaGridOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaGridOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
