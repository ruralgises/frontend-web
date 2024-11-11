import { TestBed } from '@angular/core/testing';

import { RuralPropertyService } from './rural-property.service';

describe('RuralPropertyService', () => {
  let service: RuralPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuralPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
