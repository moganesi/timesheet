import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import {MatNativeDateModule,MatSnackBarModule,MatIconModule,MatDialogModule, MatButtonModule, MatTableModule, MatPaginatorModule , MatSortModule,MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCard, MatCardModule, MatFormField, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule } from  '@angular/material/';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from  '@angular/material/radio';
import {MatSelectModule} from  '@angular/material/select';
import {MatSliderModule} from  '@angular/material/slider';
import {MatDividerModule} from  '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import{MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { TimesheetContainerComponent } from '../timesheet-container/timesheet-container.component';
import { DataentryComponent } from './dataentry/dataentry.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RecipientlistComponent } from './recipientlist/recipientlist.component';
import { EmailLoginComponent } from '../email-login/email-login.component';
import { LoginPageComponent } from '../login-page/login-page.component';


@NgModule({
   declarations: [
      AppComponent,
      TimesheetComponent,
      TimesheetContainerComponent,
      DataentryComponent,
      RecipientlistComponent,
      EmailLoginComponent,
      LoginPageComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      MatNativeDateModule,
      MatDividerModule,
      MatSliderModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatSnackBarModule,
      MatDialogModule,
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatFormFieldModule,
      MatProgressSpinnerModule,
      MatInputModule,
      MatTableModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
