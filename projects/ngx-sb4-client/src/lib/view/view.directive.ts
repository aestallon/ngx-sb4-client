import {
  AfterViewInit,
  Directive,
  inject,
  input,
  InputSignal,
  OnInit,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {ViewStore} from './view.service';
import {NgxSb4ClientService} from '../ngx-sb4-client.service';

@Directive()
export class View implements OnInit, AfterViewInit {

  readonly viewUuid: InputSignal<string> = input.required();
  readonly viewStore = inject(ViewStore, {self: true, optional: false});
  readonly clientService = inject(NgxSb4ClientService)
  readonly childView = viewChild('childView', {read: ViewContainerRef});

  async ngOnInit(): Promise<void> {
    await this.clientService.getComponentModel(this);
  }

  ngAfterViewInit() {
    console.log('Hello from View Directive: ', this.clientService.viewContext());
  }

}
