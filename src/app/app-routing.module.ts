import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetContainerComponent } from 'src/timesheet-container/timesheet-container.component';
import { RecipientlistComponent } from './recipientlist/recipientlist.component';



const routes: Routes = [
  { path: '', redirectTo: 'timesheet', pathMatch: 'full'},
  { path: 'timesheet', component: TimesheetContainerComponent },
  { path: 'recipientlist', component: RecipientlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
