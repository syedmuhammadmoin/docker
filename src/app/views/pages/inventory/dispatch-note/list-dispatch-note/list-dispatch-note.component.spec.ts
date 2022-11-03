import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatchNoteComponent } from './list-dispatch-note.component';

describe('ListDispatchNoteComponent', () => {
  let component: ListDispatchNoteComponent;
  let fixture: ComponentFixture<ListDispatchNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDispatchNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatchNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
