import {InjectionToken, Type} from '@angular/core';
import {SearchProvider} from './types';

export const SEARCH_PROVIDERS = new InjectionToken<Type<SearchProvider>[][]>('SearchProviders');
