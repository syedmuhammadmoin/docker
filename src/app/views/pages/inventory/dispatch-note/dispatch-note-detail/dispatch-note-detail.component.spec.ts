import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchNoteDetailComponent } from './dispatch-note-detail.component';

describe('DispatchNoteDetailComponent', () => {
  let component: DispatchNoteDetailComponent;
  let fixture: ComponentFixture<DispatchNoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchNoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
