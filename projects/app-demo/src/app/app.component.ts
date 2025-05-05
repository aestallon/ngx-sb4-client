import {Component, inject} from '@angular/core';
import {DashboardViewComponent} from './dashboard-view/dashboard-view.component';
import {
  LaunchCall,
  NgxSb4ClientComponent,
  Sb4ClientProperties
} from 'ngx-sb4-client';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [NgxSb4ClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'app-demo';

  clientProps: Sb4ClientProperties = {
    views: new Map([
      ['home', DashboardViewComponent]
    ])
  };

  httpClient = inject(HttpClient);
  protected readonly launchCall: LaunchCall = async context => {
    await lastValueFrom(this.httpClient.get('/api/launch', {context}));
    return Promise.resolve();
  };
}
