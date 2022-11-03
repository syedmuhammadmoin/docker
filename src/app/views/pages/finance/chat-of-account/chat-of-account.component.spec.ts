import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOfAccountComponent } from './chat-of-account.component';

describe('ChatOfAccountComponent', () => {
  let component: ChatOfAccountComponent;
  let fixture: ComponentFixture<ChatOfAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOfAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
