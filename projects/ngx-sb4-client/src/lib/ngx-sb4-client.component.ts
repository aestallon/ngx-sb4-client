import {
  AfterViewInit,
  Component, computed, effect,
  inject, Injector,
  input,
  Type, viewChild,
  ViewContainerRef
} from '@angular/core';
import {NgxSb4ClientService} from './ngx-sb4-client.service';
import {View} from './view/view.directive';
import {HttpContext} from '@angular/common/http';

export interface Sb4ClientProperties {
  views: Map<string, Type<View>>;
}

export type LaunchCall = (context: HttpContext) => Promise<void>;

@Component({
  selector: 'sb4-client',
  imports: [],
  template: '<ng-container #rootView class="sb4-root-view"></ng-container>',
  styles: ``,
  providers: [{provide: NgxSb4ClientService, useClass: NgxSb4ClientService}]
})
export class NgxSb4ClientComponent implements AfterViewInit {
  readonly rootView = viewChild.required('rootView', {read: ViewContainerRef});
  readonly clientService: NgxSb4ClientService = inject(NgxSb4ClientService);
  readonly props = input.required<Sb4ClientProperties>();
  readonly launchCall = input.required<LaunchCall>();
  readonly injector = inject(Injector);

  readonly views = computed(() => {
    console.log('View Context Change computation is running....');
    const viewContext = this.clientService.viewContext();
    console.log('VC is: ', viewContext);
    if (!viewContext) {
      return [];
    }

    // TODO: resolve hierarchy
    return viewContext.views;
  });

  readonly viewEffect = effect(onCleanup => {
    const views = this.views();
    console.log('View Effect is running. Views: ', views);
    if (views.length === 0) {
      return;
    }

    const rootViewData = views[0];
    const viewType = this.props().views.get(rootViewData.viewName);
    console.log('ViewType for view: ', viewType, rootViewData.viewName);
    if (!viewType) {
      return;
    }

    this.rootView().clear();
    const injector = Injector.create({
      providers: [
        {
          provide: NgxSb4ClientService,
          useValue: this.clientService,
        }
      ],
      parent: this.injector
    });

    const viewRef = this.rootView().createComponent(viewType, {
      injector
    });
    viewRef.setInput('viewUuid', rootViewData.uuid);
    viewRef.onDestroy(() => {

    });

    onCleanup(() => {
      viewRef.destroy();
    });
  });

  constructor() {
  }

  ngAfterViewInit() {
    this.clientService.createViewContext()
      .then(() => this.clientService.createHttpContext())
      .then((context) => this.launchCall()(context))
      .then(() => this.clientService.refreshViewContext())
      .then(() => console.log('App launched'));
  }


}
