import {Injector, Provider, StaticProvider} from '@angular/core';
import {MaybeAsync} from 'ngx-plugin-modules';
import {SearchProvider, SearchResult} from './types';

export type SearchResultData = Omit<SearchResult, 'injector'> & {providers: StaticProvider[]};

export abstract class AbstractSearchProvider implements SearchProvider {
  abstract id: string;
  abstract searchBarSettings: {title: string; icon: string};

  constructor(private injector: Injector) {}

  protected createSearchResult({component, onClick, providers}: SearchResultData): SearchResult {
    return {
      injector: Injector.create({
        parent: this.injector,
        providers: providers,
      }),
      component,
      onClick,
    };
  }

  abstract search(term: string): MaybeAsync<SearchResult[]>;
}
