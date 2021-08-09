import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {providePluginProcessor} from 'ngx-plugin-modules';
import {SearchPluginProcessorService} from './search-plugin-processor.service';
import {SearchService} from './search.service';

@NgModule({
  imports: [CommonModule],
})
export class SearchModule {
  static forFeature(): ModuleWithProviders<SearchModule> {
    return {
      ngModule: SearchModule,
      providers: [
        // {
        //   provide: FORM_ENTRIES,
        //   useValue: formEntries,
        //   multi: true,
        // },
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
