# ngx-plugin-modules

[![Netlify Status](https://api.netlify.com/api/v1/badges/5ae923cb-3ac2-4c31-9c63-9e5274135f10/deploy-status)](https://app.netlify.com/sites/ngx-plugin-modules/deploys)

## TODO - REWRITE README

## Purpose

The purpose of this repository is to present a POC of a plugin system, and provide a way for these modules to expose API in a unified way.
PluginModules should be lazy-loadable. When lazy-loaded, they should be conditionally loaded (like `canLoad` with lazy loaded routes).

## Why not use the routing mechanism?

This is a POC which will hopefully, after refactoring and improving, be used in a certain app.  
This app does not rely on routing, and basically has two routes: /login and /app.  
The /app contains a big application, with a map, and a lot of map elements and floating forms.  
Under certain circumstances, we don't want to load all feature modules -

- Different environments
- A/B Testing
- Etc

And so, I want to provide a way for modules to expose some api, that will be available to the app, if and once loaded.

## Structure

The main library is in `/projects/plugin-modules`.  
It contains the entire plugin modules API, and exposes services which are needed to interact with, an plug into, the plugin module system.

The example plugin system is in `/projects/forms-registry`.  
The purpose of the library is to save and expose a registry of components with certain attributes (e.g: each component has a category, code, etc.).

Each feature module can expose such components by using the `forms-registry` library.

## The Example Application

The app component shows a simple menu with all the components from the registry.
Clicking on a component name loads the component below the menu.

## Plugin System

Each plugin system can expose instances of the [PluginProcessor](projects/plugin-modules/src/lib/interfaces.ts#18) interface.

```typescript
// From library
export interface PluginProcessor {
  process(moduleRef: NgModuleRef<any>): void | Promise<void> | Observable<void>;
}

// Userland
export class MyProcessor implements PluginProcessor { ... }

NgModule({
  providers: [
    providePluginProcessor(MyProcessor),
  ],
})
class MyPluginSystemModule { ... }
```

Plugin systems can save whatever data they want on modules via providers.

When a feature module is loaded and boostrapped, it is ran through the `PluginProcessorsService` which saves all `PluginProcessors` and activates them.

When the plugin system processor is activated, this is where you can collect the data saved on the module, and act accordingly.

## The Example Plugin System: [Forms Registry](/projects/forms-registry)

The library exposes the `FormsRegistryService` which is the main public API for the plugin system:

```typescript
@Injectable()
export class FormsRegistry {
  formEntries$(): Observable<FormEntry[]>;

  add<T = any>(formEntry: FormEntry<T>, componentFactory: ComponentFactory<T>): void;

  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> | null;
}
```

The plugin system registers the `PluginProcessor` via a `forRoot` import:

```typescript
@NgModule({
  imports: [
    PluginsModule.forRoot([
      {
        loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module),
        name: 'feature1', // name provided for diagnostics
      },
    ]),
    FormsRegistryModule.forRoot(),
  ],
})
export class AppModule {}
```

Feature Modules expose forms to the registry via a `forFeature` import:

```typescript
@NgModule({
  declarations: [Feature1FormComponent],
  imports: [
    CommonModule,
    FormsRegistryModule.forFeature([
      {
        category: 'Category 1',
        component: Feature1FormComponent,
        name: 'Feature1FormComponent',
      },
    ]), // expose api
    PluginsModule.forFeature(), // register as module that exposes api via plugins
  ],
})
export class Feature1Module {}
```

When the module is loaded, the [FormsRegistryProcessor](projects/forms-registry/src/lib/forms-registry-processor.service.ts) collects the forms provided in the feature module, and loads them into the registry with `FormRegistryService#add`.
