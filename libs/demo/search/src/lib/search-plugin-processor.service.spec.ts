import {TestBed} from '@angular/core/testing';

import {SearchPluginProcessorService} from './search-plugin-processor.service';
import {SearchService} from './search.service';

describe('SearchPluginProcessorService', () => {
  let service: SearchPluginProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService, SearchPluginProcessorService],
    });
    service = TestBed.inject(SearchPluginProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
