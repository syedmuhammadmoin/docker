import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessPartnerComponent } from './create-business-partner.component';

describe('CreateBusinessPartnerComponent', () => {
  let component: CreateBusinessPartnerComponent;
  let fixture: ComponentFixture<CreateBusinessPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBusinessPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
