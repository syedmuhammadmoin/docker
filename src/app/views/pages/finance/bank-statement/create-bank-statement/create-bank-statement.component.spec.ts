import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankStatementComponent } from './create-bank-statement.component';

describe('CreateBankStatementComponent', () => {
  let component: CreateBankStatementComponent;
  let fixture: ComponentFixture<CreateBankStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBankStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBankStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
