import { TestBed } from '@angular/core/testing';

import { SearchProvider1Service } from './search-provider1.service';

describe('SearchProvider1Service', () => {
  let service: SearchProvider1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchProvider1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
