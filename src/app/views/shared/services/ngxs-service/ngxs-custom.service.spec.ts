import { TestBed } from '@angular/core/testing';

import { NgxsCustomService } from './ngxs-custom.service';

describe('NgxsCustomService', () => {
  let service: NgxsCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxsCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
