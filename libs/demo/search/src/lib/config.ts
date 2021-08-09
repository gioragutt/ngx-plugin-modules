import {InjectionToken} from '@angular/core';
import {SearchSourceProvider} from './types';

export const SEARCH_SOURCE_PROVIDERS = new InjectionToken<SearchSourceProvider[][]>(
  'SearchSourceProviders',
);
