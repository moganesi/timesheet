import { Component } from '@angular/core';
import {TimesheetComponent} from '../timesheet/timesheet.component'

@Component({
  selector: 'app-root',
  template:`
      <app-timesheet-container></app-timesheet-container>
  `

})
// templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
export class AppComponent {
  title = 'timesheet';
}
