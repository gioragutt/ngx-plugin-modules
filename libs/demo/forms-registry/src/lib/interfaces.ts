import {Type, ViewRef} from '@angular/core';

export interface FormEntry<T = unknown> {
  component: Type<T>;
  category: string;
  name: string;
}

export type FormEntries = FormEntry[];

export interface FormEntryViewRef<T = unknown> {
  viewRef: ViewRef;
  formEntry: FormEntry<T>;
}
