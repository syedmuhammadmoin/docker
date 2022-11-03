import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBankStatementComponent } from './detail-bank-statement.component';

describe('DetailBankStatementComponent', () => {
  let component: DetailBankStatementComponent;
  let fixture: ComponentFixture<DetailBankStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBankStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBankStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
