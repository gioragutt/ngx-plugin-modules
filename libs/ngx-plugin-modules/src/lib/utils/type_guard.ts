import { CanLoad, PluginProcessor } from '../interfaces';

export function isFunction<T>(v: unknown): v is T {
  return typeof v === 'function';
}

export function isCanLoad(guard: unknown): guard is CanLoad {
  return guard ? isFunction<CanLoad>((guard as CanLoad).canLoad) : false;
}

export function isPluginProcessor(value: unknown): value is PluginProcessor {
  return value ? isFunction<PluginProcessor>((value as PluginProcessor).process) : false;
}
