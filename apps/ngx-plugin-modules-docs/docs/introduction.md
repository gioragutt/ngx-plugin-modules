---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

# Introduction

`ngx-plugin-modules` is an [Angular](https://angular.io) library, with the purpose of allowing to create architectures using the concept of plugins.

At it's essence, `ngx-plugin-modules` lets you split your app (or whatever part of it which makes sense for you), conceptually, into a "core", and other modules, which will be able to connect to that "core" in a constrained way.

The means by which these other modules, lets call them Feature Modules, interact with the core of the app, are via plugins.

## What are plugins?

Lets use an example to understand what plugins are. Think of a search bar at the top of your app.

Lets say that there may be multiple sources for search results. Each source of results may even be managed by different teams.

The core of the app will define the core of the search behavior - you have the search bar, and when it changes, it will query the available search sources for results.

Every search source follows the same pattern:

```ts
interface SearchSource {
  // Configuration for the UI
  readonly searchBarSettings: {title: string; icon: string};

  // Return results for given term
  search(term: string): Observable<string[]>;
}
```

---

Each Feature Module will create a service which implements this interface:

```ts
@Injectable()
export class MySearchSourceService implements SearchSource {
  readonly searchBarSettings = {
    title: 'My Results',
    icon: 'search'
  },

  constructor(private http: HttpClient) {}

  search(term: string): Observable<string[]> {
    return this.http.get<string[]>(`https://my.company.com/search?term=${encodeUriComponent(term)}`);
  }
}
```

And expose it in the module:

```ts
@NgModule({
  imports: [SearchModule.forFeature([MySearchSourceService])],
})
export class MyFeatureModule {}
```

---

And in the "core" of the app, you would set up the core part of the plugin module:

```ts
@NgModule({
  imports: [SearchModule.forRoot()],
})
export class AppModule {}
```

And in the search bar, you will be able to get access to all search sources:

```ts
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  readonly searchTermControl = new FormControl();

  readonly results = combineLatest([
    this.searchTermControl.valueChanges,
    this.searchService.providers,
  ]).pipe(
    debounceTime(300),
    switchMap(([term, providers]) => createSearchResults(term, providers)),
  );

  constructor(private searchService: SearchService) {}

  changeProvider(id: string) {
    this.searchService.changeProvider(id);
  }
}
```

---

What happens in between, and how `SearchService` gets all the providers, is the magic done by `ngx-plugin-modules`.

## Inspiration

`ngx-plugin-modules` takes concepts from two libraries:

### [`@ngrx/effects`](https://ngrx.io/guide/effects)

`@ngrx/effects` does something magical. It allows each feature module to declare it's own Effects, without having to deal with how Effects work and what subscribes to them and makes them work behind the scenes.

I look at it as the ability to have some kind of "core" functionality, and allow feature modules to "plug-in" to that functionality.

### [`@angular/router`](https://angular.io/api/router)

One of the important problems I wanted to take care of, is allow modules to be lazy-loadable without using the lazy-loading mechanism of routing.

The use case is apps that aren't normal website, but act more like proper applications, which have a heavy core, and have lots of features that may or may not load, based on different requirements.

The library uses concepts from `@angular/router` in order to allow modules to load lazily.
