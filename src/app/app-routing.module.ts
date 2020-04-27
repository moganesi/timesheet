import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetContainerComponent } from 'src/timesheet-container/timesheet-container.component';
import { RecipientlistComponent } from './recipientlist/recipientlist.component';
import { EmailLoginComponent } from 'src/email-login/email-login.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: EmailLoginComponent },
  { path: 'timesheet', component: TimesheetContainerComponent },
  { path: 'recipientlist', component: RecipientlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
