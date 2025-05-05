import {ChangeDetectionStrategy, Component} from '@angular/core';
import {View, ViewStore} from 'ngx-sb4-client';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css',
  providers: [ViewStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent extends View {


  getGreeting(): string {
    const data = (this.viewStore.componentModel.data as any)
    if (!data) {
      return 'foo';
    }
    return (data().data?.greeting ?? 'Missing data') as string;
  }
}
