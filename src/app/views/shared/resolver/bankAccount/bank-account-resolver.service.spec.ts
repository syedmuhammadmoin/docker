import { TestBed } from '@angular/core/testing';

import { BankAccountResolverService } from './bank-account-resolver.service';

describe('BankAccountResolverService', () => {
  let service: BankAccountResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAccountResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
