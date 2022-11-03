import { TestBed } from '@angular/core/testing';

import { AccountResolverService } from './account-resolver.service';

describe('AccountResolverService', () => {
  let service: AccountResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

