import { Component } from '@angular/core';
import {TimesheetComponent} from '../timesheet/timesheet.component'


@Component({
  selector: 'app-root',
  template:`
  <mat-drawer-container class="example-container">
  <mat-drawer mode="side" opened>
     <a href="" routerLink="/timesheet">Timesheet</a>
     <br/>
     <a href="" routerLink="/recipientlist">Recipient List</a>
</mat-drawer>
  <mat-drawer-content><router-outlet></router-outlet></mat-drawer-content>
</mat-drawer-container>

  `

})
// templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
export class AppComponent {
  title = 'timesheet';
}
//<app-timesheet-container></app-timesheet-container>
