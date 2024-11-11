import { TestBed } from '@angular/core/testing';

import { RuralPropertyMinimumService } from './rural-property-minimum.service';

describe('RuralPropertyMinimumService', () => {
  let service: RuralPropertyMinimumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuralPropertyMinimumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
