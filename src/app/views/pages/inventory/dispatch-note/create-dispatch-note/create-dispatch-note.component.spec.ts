import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispatchNoteComponent } from './create-dispatch-note.component';

describe('CreateDispatchNoteComponent', () => {
  let component: CreateDispatchNoteComponent;
  let fixture: ComponentFixture<CreateDispatchNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDispatchNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispatchNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
