import {Component, Inject, Injectable, InjectionToken, Injector} from '@angular/core';
import {SearchProvider, SearchResult} from '@ngx-plugin-modules/demo/search';
import {MaybeAsync} from 'ngx-plugin-modules';

const DATA = new InjectionToken<string>('SEARCH RESULT DATA');

@Component({
  selector: 'lib-search-result-1',
  template: `<div>
    <mat-icon>search</mat-icon>
    {{ data }}
  </div>`,
})
export class SearchResult1Component {
  constructor(@Inject(DATA) public data: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class SearchProvider1Service implements SearchProvider {
  readonly id = 'feature1search';
  readonly searchBarSettings = {
    title: 'Feature 1 Search',
    icon: 'search',
  };

  constructor(private injector: Injector) {}

  search(term: string): MaybeAsync<SearchResult[]> {
    const results: SearchResult[] = [...term].map(value => ({
      injector: Injector.create({
        providers: [{provide: DATA, useValue: value}],
        parent: this.injector,
      }),
      onClick: () => console.log(value),
      component: SearchResult1Component,
    }));

    return results;
  }
}
