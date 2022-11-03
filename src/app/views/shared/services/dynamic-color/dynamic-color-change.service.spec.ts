import { TestBed } from '@angular/core/testing';

import { DynamicColorChangeService } from './dynamic-color-change.service';

describe('DynamicColorChangeService', () => {
  let service: DynamicColorChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicColorChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
