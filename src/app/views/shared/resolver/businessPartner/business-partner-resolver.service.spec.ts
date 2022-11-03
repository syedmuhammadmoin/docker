import { TestBed } from '@angular/core/testing';

import { BusinessPartnerResolverService } from './business-partner-resolver.service';

describe('BusinessPartnerResolverService', () => {
  let service: BusinessPartnerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessPartnerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
