---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

# Introduction

`ngx-plugin-modules` is an [Angular](https://angular.io) library, with the purpose of allowing to create architectures using the concept of plugins.

## Inspiration

`ngx-plugin-modules` takes concepts from two libraries:

### [`@ngrx/effects`](https://ngrx.io/guide/effects)

`@ngrx/effects` does something magical. It allows each feature module to declare it's own Effects, without having to deal with how Effects work and what subscribes to them and makes them work behind the scenes.

I look at it as the ability to have some kind of "core" functionality, and allow feature modules to "plug-in" to that functionality.

### [`@angular/router`](https://angular.io/api/router)

One of the important problems I wanted to take care of, is allow modules to be lazy-loadable without using the lazy-loading mechanism of routing.

The use case is apps that aren't normal website, but act more like proper applications, which have a heavy core, and have lots of features that may or may not load, based on different requirements.

The library uses concepts from `@angular/router` in order to allow modules to load lazily.
