import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.css']
})
export class DataentryComponent implements OnInit {
  recipientForm: FormGroup;
  // recipientNameCtrl: FormControl;
  // totalMonthlyHoursCtrl: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.recipientForm = this.fb.group({
      recipientName: ['', [Validators.required]],
      totalhoursPerMonth: [ '',[ Validators.required]],
      remainingHoursFromLastPayPeriod: ['', [Validators.required]],
      allowableHoursPerWeek:['', [Validators.required]],
      hoursPerPeyPeriod1:['', [Validators.required]],
      hoursPerPeyPeriod2:['', [Validators.required]],
      docId:['', [Validators.required]]
    });
  }
  get recipientName() {
    return this.recipientForm.get('recipientName');
  }
  get totalhoursPerMonth() {
    return this.recipientForm.get('totalhoursPerMonth');
  }
  get remainingHoursFromLastPayPeriod() {
    return this.recipientForm.get('remainingHoursFromLastPayPeriod');
  }
  get allowableHoursPerWeek() {
    return this.recipientForm.get('allowableHoursPerWeek');
  }
  get hoursPerPeyPeriod1() {
    return this.recipientForm.get('hoursPerPeyPeriod1');
  }
  get hoursPerPeyPeriod2() {
    return this.recipientForm.get('hoursPerPeyPeriod2');
  }
  get docId() {
    return this.recipientForm.get('docId');
  }

  onSubmit(){
    console.log(this.recipientForm.value);
  }

}
