import {Component, inject} from '@angular/core';
import {DashboardViewComponent} from './dashboard-view/dashboard-view.component';
import {
  LaunchCall,
  NgxSb4ClientComponent,
  Sb4ClientProperties
} from 'ngx-sb4-client';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgxSb4ClientComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

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

  title = 'Sb4 Client Demo';


  widget1Label = 'Custom Components';
  widget2Label = 'Layout Definitions';

  currentWidget = 1;

  switchWidget(widgetNumber: number) {
    this.currentWidget = widgetNumber;
  }

}
