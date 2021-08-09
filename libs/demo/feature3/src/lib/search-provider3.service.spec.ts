import {TestBed} from '@angular/core/testing';

import {SearchProvider3Service} from './search-provider3.service';

describe('SearchProvider3Service', () => {
  let service: SearchProvider3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchProvider3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
