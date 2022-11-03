import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDebitNoteComponent } from './print-debit-note.component';

describe('PrintDebitNoteComponent', () => {
  let component: PrintDebitNoteComponent;
  let fixture: ComponentFixture<PrintDebitNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDebitNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
