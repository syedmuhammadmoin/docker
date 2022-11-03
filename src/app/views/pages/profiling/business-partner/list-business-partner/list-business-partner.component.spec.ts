import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessPartnerComponent } from './list-business-partner.component';

describe('ListBusinessPartnerComponent', () => {
  let component: ListBusinessPartnerComponent;
  let fixture: ComponentFixture<ListBusinessPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusinessPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
