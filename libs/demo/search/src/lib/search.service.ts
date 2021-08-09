import {Injectable} from '@angular/core';
import {SearchSourceProvider} from './types';

@Injectable()
export class SearchService {
  private providers: SearchSourceProvider[] = [];

  registerProvider(provider: SearchSourceProvider) {
    if (this.providers.find(p => p.id === provider.id)) {
      throw new Error(`provider "${provider.id}" already registered`);
    }

    this.providers.push(provider);
  }
}
