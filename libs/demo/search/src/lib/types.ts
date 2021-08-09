import {Type} from '@angular/core';
import {Observable} from 'rxjs';

export interface SearchResult {
  data: unknown;
  component: Type<unknown>;
  onClick(): void;
}

export interface SearchSourceProvider {
  readonly id: string;

  readonly searchBarSettings: {
    title: string;
    icon: string;
  };

  search(term: string): Observable<SearchResult[]>;
}
