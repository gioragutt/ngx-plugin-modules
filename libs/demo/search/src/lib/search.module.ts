import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {providePluginProcessor} from 'ngx-plugin-modules';
import {SEARCH_PROVIDERS} from './config';
import {SearchPluginProcessorService} from './search-plugin-processor.service';
import {SearchService} from './search.service';
import {SearchProvider} from './types';

@NgModule({
  imports: [CommonModule],
})
export class SearchModule {
  static forFeature(searchProviders: Type<SearchProvider>[]): ModuleWithProviders<SearchModule> {
    return {
      ngModule: SearchModule,
      providers: [
        {
          provide: SEARCH_PROVIDERS,
          useValue: searchProviders,
          multi: true,
        },
      ],
    };
  }

  static forRoot(): ModuleWithProviders<SearchModule> {
    return {
      ngModule: SearchModule,
      providers: [providePluginProcessor(SearchPluginProcessorService), SearchService],
    };
  }
}
