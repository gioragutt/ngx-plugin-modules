import {Injector, Type} from '@angular/core';
import {MaybeAsync} from 'ngx-plugin-modules';

export interface SearchResult {
  injector: Injector;
  component: Type<unknown>;
  onClick(): void;
}

export interface SearchProvider {
  readonly id: string;

  readonly searchBarSettings: {
    title: string;
    icon: string;
  };

  search(term: string): MaybeAsync<SearchResult[]>;
}
