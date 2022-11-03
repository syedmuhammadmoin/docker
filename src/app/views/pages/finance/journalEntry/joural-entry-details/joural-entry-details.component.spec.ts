import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JouralEntryDetailsComponent } from './joural-entry-details.component';

describe('JouralEntryDetailsComponent', () => {
  let component: JouralEntryDetailsComponent;
  let fixture: ComponentFixture<JouralEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JouralEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JouralEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
