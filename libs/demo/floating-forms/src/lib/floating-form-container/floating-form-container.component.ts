import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormEntry,
  FormEntryViewRef,
  FormRegistryComponentDirective,
} from '@ngx-plugin-modules/demo/forms-registry';
import {Observable} from 'rxjs';
import {FloatingFormContainer, TabSplitEvent} from '../floating-form-container';

@Component({
  selector: 'lib-floating-form-container',
  templateUrl: './floating-form-container.component.html',
  styleUrls: ['./floating-form-container.component.scss'],
})
export class FloatingFormContainerComponent
  implements AfterViewInit, OnDestroy, FloatingFormContainer
{
  private static idCounter = 0;

  @ViewChildren(FormRegistryComponentDirective)
  private tabs!: QueryList<FormRegistryComponentDirective>;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly afterViewInit = new EventEmitter<void>();
  @Output() readonly splitTab = new EventEmitter<TabSplitEvent>();
  @Output() readonly gainFocus = new EventEmitter<void>();
  @Output() readonly destroyed = new EventEmitter<void>();

  readonly id = FloatingFormContainerComponent.idCounter++;

  openFloatingFormContainers$!: Observable<number>;

  focused = false;
  selected = 0;
  componentTabs: FormEntryViewRef[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.destroyed.emit();
    this.destroyed.complete();
  }

  ngAfterViewInit(): void {
    this.afterViewInit.emit();
    this.afterViewInit.complete();
  }

  addNewTab(formEntry: FormEntry) {
    this.addTab({formEntry});
  }

  onFocus(): void {
    this.focused = true;
  }

  onFocusOut(): void {
    this.focused = false;
  }

  closeCurrentTab(): void {
    if (this.closeTab(this.selected)) {
      this.closed.emit();
      this.closed.complete();
    }
  }

  split(index: number): void {
    const tab = this.tabs.toArray()[index];
    const formFromView = tab.detach();
    const isLastTab = this.closeTab(index);
    this.splitTab.emit({formFromView, isLastTab});
    if (!isLastTab) {
      this.selected = index;
    }
  }

  closeTab(index: number) {
    this.componentTabs.splice(index, 1);
    return this.componentTabs.length === 0;
  }

  attach(event: FormEntryViewRef): void {
    this.addTab(event);
  }

  private addTab(event: FormEntryViewRef) {
    this.componentTabs.push(event);
    this.selected = this.componentTabs.length - 1;
    this.cdr.detectChanges();
  }
}
