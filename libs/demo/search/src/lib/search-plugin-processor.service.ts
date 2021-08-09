import {Injectable, NgModuleRef} from '@angular/core';
import {getFlattened, MaybeAsync, PluginProcessor} from 'ngx-plugin-modules';
import {SEARCH_PROVIDERS} from './config';
import {SearchService} from './search.service';

@Injectable()
export class SearchPluginProcessorService implements PluginProcessor {
  constructor(private readonly searchService: SearchService) {}

  process(moduleRef: NgModuleRef<unknown>): MaybeAsync<void> {
    const searchProviders = getFlattened(moduleRef.injector, SEARCH_PROVIDERS);
    if (!searchProviders) {
      return;
    }

    searchProviders
      .map(provider => moduleRef.injector.get(provider))
      .forEach(provider => {
        this.searchService.registerProvider(provider);
      });
  }
}
