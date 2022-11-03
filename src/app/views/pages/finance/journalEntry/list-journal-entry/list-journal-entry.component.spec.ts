import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJournalEntryComponent } from './list-journal-entry.component';

describe('ListJournalEntryComponent', () => {
  let component: ListJournalEntryComponent;
  let fixture: ComponentFixture<ListJournalEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListJournalEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
