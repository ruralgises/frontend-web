import { TestBed } from '@angular/core/testing';

import { CARSelectedStateService } from './car-selected-state.service';

describe('CARSelectedStateService', () => {
  let service: CARSelectedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CARSelectedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
