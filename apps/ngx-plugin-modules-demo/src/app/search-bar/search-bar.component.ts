import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchResult, SearchService} from '@ngx-plugin-modules/demo/search';
import {wrapIntoObservable} from 'ngx-plugin-modules';
import {combineLatest, NEVER, of} from 'rxjs';
import {catchError, debounceTime, defaultIfEmpty, switchMap, take} from 'rxjs/operators';

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

  constructor(private searchService: SearchService) {}

  changeProvider(id: string) {
    this.searchService.changeProvider(id);
  }
}
