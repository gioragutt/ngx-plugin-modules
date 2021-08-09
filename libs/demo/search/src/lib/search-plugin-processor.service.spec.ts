import {TestBed} from '@angular/core/testing';

import {SearchPluginProcessorService} from './search-plugin-processor.service';

describe('SearchPluginProcessorService', () => {
  let service: SearchPluginProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPluginProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
