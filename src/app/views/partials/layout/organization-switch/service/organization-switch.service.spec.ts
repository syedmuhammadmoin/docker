import { TestBed } from '@angular/core/testing';

import { OrganizationSwitchService } from './organization-switch.service';

describe('OrganizationSwitchService', () => {
  let service: OrganizationSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
