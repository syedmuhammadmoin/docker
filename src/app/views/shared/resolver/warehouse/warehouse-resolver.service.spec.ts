import { TestBed } from '@angular/core/testing';

import { WarehouseResolverService } from './warehouse-resolver.service';

describe('WarehouseResolverService', () => {
  let service: WarehouseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
