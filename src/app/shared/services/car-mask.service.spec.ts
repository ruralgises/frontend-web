import { TestBed } from '@angular/core/testing';

import { CarMaskService } from '../../core/services/car-mask/car-mask.service';

describe('CarMaskService', () => {
  let service: CarMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
