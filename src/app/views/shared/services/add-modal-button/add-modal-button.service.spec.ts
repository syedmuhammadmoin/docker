import { TestBed } from '@angular/core/testing';

import { AddModalButtonService } from './add-modal-button.service';

describe('AddModalButtonService', () => {
  let service: AddModalButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddModalButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
