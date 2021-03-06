import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {SearchProvider} from './types';

@Injectable()
export class SearchService {
  private readonly providers = new BehaviorSubject<SearchProvider[]>([]);
  private readonly activeProviderId = new BehaviorSubject<string>('');

  readonly providers$ = this.providers.asObservable();
  readonly activeProvider$ = combineLatest([
    this.providers,
    this.activeProviderId.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([providers, activeProviderId]) => {
      return providers.find(p => p.id === activeProviderId) ?? providers[0] ?? null;
    }),
  );

  changeProvider(id: string) {
    this.activeProviderId.next(id);
  }

  registerProvider(provider: SearchProvider) {
    if (this.providers.value.find(p => p.id === provider.id)) {
      throw new Error(`provider "${provider.id}" already registered`);
    }

    this.providers.next([...this.providers.value, provider]);
    console.log('new providers', this.providers.value);
  }
}
