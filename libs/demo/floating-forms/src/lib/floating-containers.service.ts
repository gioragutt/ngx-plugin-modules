import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import {FormEntryViewRef} from '@ngx-plugin-modules/demo/forms-registry';
import {BehaviorSubject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
// import {Logger} from '../logger/logger';
// import {LoggerService} from '../logger/logger.service';
import {FloatingFormContainer, TabSplitEvent} from './floating-form-container';
import {FloatingFormContainerComponent} from './floating-form-container/floating-form-container.component';

export type FloatingContainerRef = ComponentRef<FloatingFormContainer>;

@Injectable({
  providedIn: 'root',
})
export class FloatingContainersService {
  // private readonly logger: Logger;
  private readonly logger: Console;
  private boundingView!: ViewContainerRef;
  private renderer: Renderer2;
  private floatingContainers: FloatingContainerRef[] = [];
  private floatingContainersCount = new BehaviorSubject<number>(0);
  private focusedContainer: FloatingContainerRef | null = null;

  constructor(
    private resolver: ComponentFactoryResolver,
    rendererFactory: RendererFactory2,
    // loggerService: LoggerService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.logger = console;
  }

  setBoundingView(boundingView: ViewContainerRef): void {
    this.boundingView = boundingView;
  }

  getContainer(): FloatingContainerRef {
    return this.focusedContainer || this.floatingContainers[0] || this.createFloatingContainer();
  }

  private updateContainersCount(): void {
    this.floatingContainersCount.next(this.floatingContainers.length);
  }

  private createFloatingContainer(): FloatingContainerRef {
    const componentFactory = this.resolver.resolveComponentFactory(FloatingFormContainerComponent);
    const componentRef = this.boundingView.createComponent(componentFactory);

    this.initializeFloatingContainer(componentRef);

    this.floatingContainers.push(componentRef);
    this.updateContainersCount();

    this.logger.debug(`Created new floating container(${componentRef.instance.id})`);

    return componentRef;
  }

  private initializeFloatingContainer(componentRef: FloatingContainerRef) {
    const floatingContainer = componentRef.instance;

    const untilDestroyed = takeUntil(floatingContainer.destroyed);

    floatingContainer.openFloatingFormContainers$ = this.floatingContainersCount.asObservable();

    floatingContainer.closed
      .pipe(untilDestroyed)
      .subscribe(() => this.disposeOfFloatingContainer(componentRef));

    floatingContainer.afterViewInit
      .pipe(first())
      .subscribe(() => this.centerCreatedComponent(componentRef));

    floatingContainer.splitTab.subscribe((event: TabSplitEvent) =>
      this.handleSplit(event, componentRef),
    );

    floatingContainer.gainFocus.pipe(untilDestroyed).subscribe(() => this.focusOn(componentRef));
  }

  handleSplit({formFromView, isLastTab}: TabSplitEvent, splitFrom: FloatingContainerRef) {
    if (isLastTab) {
      this.logger.debug(`Last tab of ${splitFrom.instance.id} split, disposing of container`);
      this.disposeOfFloatingContainer(splitFrom);
    }

    if (this.floatingContainers.length === 0) {
      this.logger.warn(
        'Split called with only tab when there was just one floating container! This is a bug!',
      );
      formFromView.viewRef.destroy();
      return;
    }

    const containerToMoveTo = this.floatingContainers.filter(c => c !== splitFrom)[0];
    if (containerToMoveTo) {
      this.moveToExistingContainer(isLastTab, containerToMoveTo, splitFrom, formFromView);
    } else {
      this.moveToNewContainer(splitFrom, formFromView);
    }
  }

  private moveToNewContainer(splitFrom: FloatingContainerRef, formFromView: FormEntryViewRef<any>) {
    const attachingTo = this.createFloatingContainer();
    this.logger.debug(`Splitting from ${splitFrom.instance.id} to new(${attachingTo.instance.id})`);
    attachingTo.instance.attach(formFromView);
    this.focusOn(attachingTo);
  }

  private moveToExistingContainer(
    isLastTab: boolean,
    moveTo: FloatingContainerRef,
    splitFrom: FloatingContainerRef,
    formFromView: FormEntryViewRef<unknown>,
  ) {
    if (isLastTab) {
      this.logger.debug(
        `Moving to ${moveTo.instance.id} after ${splitFrom.instance.id} was disposed of`,
      );
    } else {
      this.logger.debug(
        `Splitting from ${splitFrom.instance.id} to existing(${moveTo.instance.id})`,
      );
    }

    moveTo.instance.attach(formFromView);

    if (isLastTab) {
      this.focusOn(moveTo);
    } else {
      this.focusOn(splitFrom);
    }
  }

  private disposeOfFloatingContainer(floatingContainerRef: FloatingContainerRef) {
    if (this.focusedContainer === floatingContainerRef) {
      this.focusedContainer = null;
    }
    const index = this.floatingContainers.indexOf(floatingContainerRef);
    this.logger.debug(
      `Disposing of container ${floatingContainerRef.instance.id} from index ${index}`,
    );
    floatingContainerRef.destroy();
    this.floatingContainers.splice(index, 1);
    this.updateContainersCount();
  }

  private centerCreatedComponent(floatingContainerRef: FloatingContainerRef) {
    const containerElement = floatingContainerRef.location.nativeElement.firstChild;
    const {offsetHeight: containerHeight, offsetWidth: containerWidth} = containerElement;
    const {
      offsetTop,
      offsetHeight: boundingHeight,
      offsetWidth: boundingWidth,
    } = this.boundingView.element.nativeElement;
    const top = offsetTop + boundingHeight / 2 - containerHeight / 2;
    const left = boundingWidth / 2 - containerWidth / 2;
    this.renderer.setStyle(containerElement, 'top', `${top}px`);
    this.renderer.setStyle(containerElement, 'left', `${left}px`);
  }

  private focusOn(container: FloatingContainerRef): void {
    this.floatingContainers.forEach(c => {
      if (c === container) {
        c.instance.onFocus();
        this.focusedContainer = container;
      } else {
        c.instance.onFocusOut();
      }
    });
  }
}
