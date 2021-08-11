---
id: terminology
title: Terminology
sidebar_label: Terminology
---

## Core App

The "core app" refers to the part of the app where the "root" components of plugin modules sit.

That's where each of your plugins will be set-up and connected to the rest of the app.

## Feature Module

Any other module that can be imported (eagerly or lazily), that can plug-in to one or more of the plugins in the core app.

## (Lazy) Load a Module

Lazy loading a module means that it will not be specified in the `imports` of the core app (transitively), and which can later be manually loaded when needed.

F.E: depending on some configuration, you may decide if you want to load some modules or not.

## Bootstrap a Module

Bootstrapping a module is the process of connecting the "Feature" parts of the plugins to the "Root" parts.

This is done by the [Plugin Processors Service](api/plugin-processors-service) by invoking all the [Plugin Processors](api/plugin-processor).
