import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import {sb4RequestInterceptor} from 'ngx-sb4-client';

export function apiRequestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  req = req.clone({
    url: req.url.replace('http://localhost', '/api')
  });
  return next(req);
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([sb4RequestInterceptor, apiRequestInterceptor])),
  ]
};
