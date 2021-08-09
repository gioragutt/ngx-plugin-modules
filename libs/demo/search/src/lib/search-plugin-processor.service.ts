import {Injectable, NgModuleRef} from '@angular/core';
import {getFlattened, MaybeAsync, PluginProcessor} from 'ngx-plugin-modules';
import {SEARCH_SOURCE_PROVIDERS} from './config';
import {SearchService} from './search.service';

@Injectable()
export class SearchPluginProcessorService implements PluginProcessor {
  constructor(private readonly searchService: SearchService) {}

  process(moduleRef: NgModuleRef<unknown>): MaybeAsync<void> {
    const searchSourceProviders = getFlattened(moduleRef.injector, SEARCH_SOURCE_PROVIDERS);
    if (!searchSourceProviders) {
      return;
    }

    for (const provider of searchSourceProviders) {
      this.searchService.registerProvider(provider);
    }
  }
}
