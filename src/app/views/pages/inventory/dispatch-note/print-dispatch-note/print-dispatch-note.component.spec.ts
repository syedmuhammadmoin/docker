import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDispatchNoteComponent } from './print-dispatch-note.component';

describe('PrintDispatchNoteComponent', () => {
  let component: PrintDispatchNoteComponent;
  let fixture: ComponentFixture<PrintDispatchNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDispatchNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDispatchNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
