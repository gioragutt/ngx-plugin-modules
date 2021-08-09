import {Component, Inject, InjectionToken, Injector} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchResult, SearchService} from '@ngx-plugin-modules/demo/search';
import {wrapIntoObservable} from 'ngx-plugin-modules';
import {combineLatest, NEVER, of} from 'rxjs';
import {catchError, debounceTime, defaultIfEmpty, switchMap, take} from 'rxjs/operators';

const DATA = new InjectionToken<string>('SEARCH RESULT DATA');

@Component({
  selector: 'app-search-result',
  template: `<div>
    <mat-icon>list</mat-icon>
    {{ data }}
  </div>`,
})
export class SearchResultComponent {
  constructor(@Inject(DATA) public data: string) {}
}

@Component({
  selector: 'app-search-result',
  template: `<div>
    <mat-icon>list</mat-icon>
    {{ data }} 2
  </div>`,
})
export class SearchResult2Component {
  constructor(@Inject(DATA) public data: string) {}
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  readonly searchTermControl = new FormControl();
  readonly providers = this.searchService.providers$;
  readonly activeProvider = this.searchService.activeProvider$;

  readonly results = combineLatest([this.searchTermControl.valueChanges, this.activeProvider]).pipe(
    debounceTime(300),
    switchMap(([term, provider]) => {
      if (!term) {
        return of([]);
      }

      return wrapIntoObservable(provider.search(term)).pipe(
        defaultIfEmpty<SearchResult[]>([]),
        take(1),
        catchError(() => NEVER),
      );
    }),
  );

  changeProvider(id: string) {
    this.searchService.changeProvider(id);
  }

  constructor(private searchService: SearchService, injector: Injector) {
    searchService.registerProvider({
      id: 'test',
      searchBarSettings: {
        title: 'Search Test',
        icon: 'search',
      },
      search: term => {
        const results: SearchResult[] = [...term].map(value => ({
          injector: Injector.create({
            providers: [{provide: DATA, useValue: value}],
            parent: injector,
          }),
          onClick: () => console.log(value),
          component: SearchResultComponent,
        }));

        return results;
      },
    });

    searchService.registerProvider({
      id: 'test2',
      searchBarSettings: {
        title: 'Search Test 2',
        icon: 'send',
      },
      search: term => {
        const result: SearchResult = {
          injector: Injector.create({
            providers: [{provide: DATA, useValue: term}],
            parent: injector,
          }),
          onClick: () => console.log(term),
          component: SearchResult2Component,
        };

        return [result];
      },
    });
  }
}
