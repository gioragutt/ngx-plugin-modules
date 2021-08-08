import { Observable } from 'rxjs';
import { FormEntry, FormEntryViewRef } from 'projects/forms-registry';

export interface TabSplitEvent {
  formFromView: FormEntryViewRef;
  isLastTab: boolean;
}

export interface FloatingFormContainer {
  readonly closed: Observable<void>;
  readonly afterViewInit: Observable<void>;
  readonly splitTab: Observable<TabSplitEvent>;
  readonly gainFocus: Observable<void>;
  readonly destroyed: Observable<void>;
  readonly id: number;
  openFloatingFormContainers$: Observable<number>;

  onFocus(): void;
  onFocusOut(): void;
  addNewTab(formEntry: FormEntry): void;
  attach(formEntryViewRef: FormEntryViewRef): void;
}
