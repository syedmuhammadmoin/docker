import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintGrnComponent } from './print-grn.component';

describe('PrintGrnComponent', () => {
  let component: PrintGrnComponent;
  let fixture: ComponentFixture<PrintGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
