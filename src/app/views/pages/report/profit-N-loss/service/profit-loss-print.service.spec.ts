import { TestBed } from '@angular/core/testing';

import { ProfitLossPrintService } from './profit-loss-print.service';

describe('ProfitLossPrintService', () => {
  let service: ProfitLossPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitLossPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
