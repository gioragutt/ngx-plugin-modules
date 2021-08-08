import { Injectable, Inject, NgModuleRef } from '@angular/core';
import { PluginProcessor } from './interfaces';
import { PLUGIN_PROCESSORS } from './config';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { wrapIntoObservable } from './utils/collections';

@Injectable({
  providedIn: 'root'
})
export class PluginProcessorsService {
  pluginProcessors: PluginProcessor[];

  constructor(@Inject(PLUGIN_PROCESSORS) pluginProcessors: PluginProcessor[]) {
    this.pluginProcessors = pluginProcessors;
  }

  process(moduleRef: NgModuleRef<any>): Observable<void> {
    return from(this.pluginProcessors).pipe(
      mergeMap(processor => wrapIntoObservable(processor.process(moduleRef))),
    );
  }
}
