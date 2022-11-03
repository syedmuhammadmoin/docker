/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BalanceSheetService } from './balance-sheet.service';

describe('Service: BalanceSheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceSheetService]
    });
  });

  it('should ...', inject([BalanceSheetService], (service: BalanceSheetService) => {
    expect(service).toBeTruthy();
  }));
});
