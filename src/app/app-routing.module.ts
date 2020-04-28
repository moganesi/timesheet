import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetContainerComponent } from 'src/timesheet-container/timesheet-container.component';
import { RecipientlistComponent } from './recipientlist/recipientlist.component';
import { EmailLoginComponent } from 'src/email-login/email-login.component';
import { AuthGuard } from './user/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: EmailLoginComponent },
  { path: 'timesheet', component: TimesheetContainerComponent,canActivate:[AuthGuard] },
  { path: 'recipientlist', component: RecipientlistComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
