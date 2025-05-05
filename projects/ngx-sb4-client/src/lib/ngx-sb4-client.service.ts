import {HttpContext, HttpContextToken, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {
  ComponentModel,
  ViewContextData,
  ViewService,
  SessionInfoData,
  SessionService,
  UiActionRequest,
  ViewState,
  ViewType
} from 'api';
import {lastValueFrom} from 'rxjs';
import {View} from './view/view.directive';


export interface Sb4RequestMetadata {
  viewContextUuid?: string;
  authorization?: string;
}

export const Sb4RequestContext = new HttpContextToken<Sb4RequestMetadata>(() => ({}));

export function sb4RequestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const sb4RequestMetadata = req.context.get(Sb4RequestContext);
  if (!!sb4RequestMetadata.authorization) {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${sb4RequestMetadata.authorization}`)
    });
  }

  if (!!sb4RequestMetadata.viewContextUuid) {
    req = req.clone({
      headers: req.headers.append('viewContextUuid', sb4RequestMetadata.viewContextUuid)
    });
  }

  return next(req);
}

@Injectable()
export class NgxSb4ClientService {

  private readonly api: ViewService = inject(ViewService);
  private readonly sessionApi: SessionService = inject(SessionService);
  readonly viewContext = signal<ViewContextData | undefined>(undefined);
  readonly sessionInfoData = signal<SessionInfoData | undefined>(undefined);

  constructor() {
  }

  private async ensureSession(): Promise<SessionInfoData> {
    if (!this.sessionInfoData()) {
      const resp = await lastValueFrom(this.sessionApi.startSession());
      this.sessionInfoData.set(resp);
    }

    return this.sessionInfoData()!;
  }

  async createHttpContext(): Promise<HttpContext> {
    const session = await this.ensureSession();
    const requestContext: Sb4RequestMetadata = {
      authorization: session.sid,
      viewContextUuid: this.viewContext()?.uuid,
    };

    const context = new HttpContext();
    context.set(Sb4RequestContext, requestContext);
    return context;
  }

  async createViewContext(): Promise<void> {
    const context = await this.createHttpContext();
    const resp = await lastValueFrom(this.api.createViewContext('body', false, {context}));
    this.viewContext.set(resp);
  }

  async refreshViewContext(): Promise<void> {
    if (!this.viewContext()?.uuid) {
      await this.createViewContext();
    } else {
      const context = await this.createHttpContext();
      const resp = await lastValueFrom(this.api.getViewContext(this.viewContext()!.uuid!, 'body', false, {context}));
      this.viewContext.set(resp);
    }
  }

  async getComponentModel(view: View) {
    const viewUuid = view.viewUuid();
    const context = await this.createHttpContext();
    const resp = await lastValueFrom(this.api.getComponentModel2(viewUuid, 'body', false, {context}));
    const componentModel = resp.result as ComponentModel;
    view.viewStore.setComponentModel(componentModel);
  }

  async performAction(viewUuid: string, request: UiActionRequest): Promise<void> {
    const viewContextUuid = this.viewContext()?.uuid;
    const change = await lastValueFrom(this.api.performAction(viewUuid, request));
  }
}
