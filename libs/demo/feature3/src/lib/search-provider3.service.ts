import {Component, Inject, Injectable, InjectionToken, Injector} from '@angular/core';
import {AbstractSearchProvider, SearchResult} from '@ngx-plugin-modules/demo/search';
import {MaybeAsync} from 'ngx-plugin-modules';

const DATA = new InjectionToken<string>('SEARCH RESULT DATA');
const DATA_2 = new InjectionToken<string>('SEARCH RESULT DATA');

@Component({
  selector: 'lib-search-result-3',
  template: `<div>
    <mat-icon>home</mat-icon>
    {{ data }}
    <b>{{ data2 }}</b>
  </div>`,
})
export class SearchResult3Component {
  constructor(@Inject(DATA) public data: string, @Inject(DATA_2) public data2: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class SearchProvider3Service extends AbstractSearchProvider {
  readonly id = 'feature3search';
  readonly searchBarSettings = {
    title: 'Feature 3 Search',
    icon: 'home',
  };

  constructor(injector: Injector) {
    super(injector);
  }

  search(term: string): MaybeAsync<SearchResult[]> {
    return [term].map(value =>
      this.createSearchResult({
        providers: [
          {provide: DATA, useValue: value},
          {provide: DATA_2, useValue: 'hello'},
        ],
        onClick: () => console.log(value),
        component: SearchResult3Component,
      }),
    );
  }
}
