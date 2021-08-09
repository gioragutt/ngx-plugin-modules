import {TestBed} from '@angular/core/testing';

import {SearchProvider2Service} from './search-provider2.service';

describe('SearchProvider2Service', () => {
  let service: SearchProvider2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchProvider2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
