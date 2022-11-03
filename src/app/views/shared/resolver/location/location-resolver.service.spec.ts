import { TestBed } from '@angular/core/testing';

import { LocationResolverService } from './location-resolver.service';

describe('LocationResolverService', () => {
  let service: LocationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
