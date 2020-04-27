import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{Recipient} from '../recipient';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.css']
})
export class DataentryComponent implements OnInit {
  recipientForm: FormGroup;
  // recipientNameCtrl: FormControl;
  // totalMonthlyHoursCtrl: FormControl;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DataentryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipient) { }

  ngOnInit() {
    this.recipientForm = this.fb.group({
      RecipientName: [this.data.RecipientName, [Validators.required]],
      TotalhoursPerMonth: [ this.data.TotalhoursPerMonth,[ Validators.required]],
      RemainingHoursFromLastPayPeriod: [this.data.RemainingHoursFromLastPayPeriod, [Validators.required]],
      AllowableHoursPerWeek:[this.data.AllowableHoursPerWeek, [Validators.required]],
      HoursPerPeyPeriod1:[this.data.HoursPerPeyPeriod1, [Validators.required]],
      HoursPerPeyPeriod2:[this.data.HoursPerPeyPeriod2, [Validators.required]],
      DocId:[this.data.DocId, [Validators.required]]
    });
  }
  get recipientName() {
    return this.recipientForm.get('RecipientName');
  }
  get totalhoursPerMonth() {
    return this.recipientForm.get('TotalhoursPerMonth');
  }
  get remainingHoursFromLastPayPeriod() {
    return this.recipientForm.get('RemainingHoursFromLastPayPeriod');
  }
  get allowableHoursPerWeek() {
    return this.recipientForm.get('AllowableHoursPerWeek');
  }
  get hoursPerPeyPeriod1() {
    return this.recipientForm.get('HoursPerPeyPeriod1');
  }
  get hoursPerPeyPeriod2() {
    return this.recipientForm.get('HoursPerPeyPeriod2');
  }
  get docId() {
    return this.recipientForm.get('DocId');
  }

  onSubmit(){
   // console.log(this.recipientForm.value);
    this.dialogRef.close(this.recipientForm.value);
  }

}
