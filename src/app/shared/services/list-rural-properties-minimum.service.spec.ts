import { TestBed } from '@angular/core/testing';

import { ListRuralPropertiesMinimumService } from './list-rural-properties-minimum.service';

describe('ListRuralPropertiesFacadeService', () => {
  let service: ListRuralPropertiesMinimumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRuralPropertiesMinimumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
