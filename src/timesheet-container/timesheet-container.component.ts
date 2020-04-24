import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import{RecipientModel} from '../app/recipient-model';
import { TimesheetComponent } from 'src/timesheet/timesheet.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { getDay, getMonth, startOfToday, getYear, getDate, lastDayOfMonth } from 'date-fns';
import { Recipient } from 'src/app/recipient';
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-timesheet-container',
  templateUrl: './timesheet-container.component.html',
  styleUrls: ['./timesheet-container.component.css']
})
export class TimesheetContainerComponent implements OnInit, AfterViewInit {
  sub:Subscription;
  @ViewChildren('timesheet') timesheets: QueryList<TimesheetComponent >;
  @ViewChild('pickerStart1') pickerStart: ElementRef<HTMLInputElement>;
  @ViewChild('pickerEnd1') pickerEnd: ElementRef<HTMLInputElement>;
  calculated:boolean=false;
  totalHourAll:number=0;
  weekTotal1=0;
  weekTotal2=0;
  weekTotal3=0;
  weekTotal4=0;
  RecipientsInfo:Array<RecipientModel>=[];
// RecipientsInfo:Array<RecipientModel>=[{
//          RecipientName:'Gohar',
//          TotalMonthlyHours:66.57,
//          PrevPaymentPeriodLastWeekHours:8,
//          PayPeriodTotalHours:33.57,
//          allowableHoursPerWeek:16
//         },
//         {
//           RecipientName:'Samo',
//           TotalMonthlyHours:70.03,
//           PrevPaymentPeriodLastWeekHours:9,
//           PayPeriodTotalHours:35.03,
//           allowableHoursPerWeek:17
//          },
//          {
//           RecipientName:'Seiran',
//           TotalMonthlyHours:90.24,
//           PrevPaymentPeriodLastWeekHours:9,
//           PayPeriodTotalHours:45.24,
//           allowableHoursPerWeek:22
//          }];
         dateFrom = "04/1/2020";
         dateTo = "04/15/2020";
         recipientsCollection: AngularFirestoreCollection<Recipient>;
         recipientObservable: Observable<Recipient[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    // this.recipientsCollection = this.afs.collection('recipients');
    // this.recipientObservable = this.recipientsCollection.valueChanges();

    // this.recipientObservable.subscribe((r) =>{ for (let index = 0; index < r.length; index++) {
    //   let rmodel =  {} as RecipientModel;
    //       rmodel.RecipientName = r[index].RecipientName;
    //       rmodel.TotalMonthlyHours = r[index].TotalhoursPerMonth;
    //       rmodel.allowableHoursPerWeek = r[index].AllowableHoursPerWeek;
    //       rmodel.PrevPaymentPeriodLastWeekHours=r[index].RemainingHoursFromLastPayPeriod;
    //       rmodel.PayPeriodTotalHours = r[index].HoursPerPeyPeriod2;
    //       this.RecipientsInfo.push(rmodel);
    // } });
    // console.log(this.RecipientsInfo);

  }

  ngAfterViewInit() {

    setTimeout(() => {
      let tday = getDate(startOfToday());//day of week//Date.today().getUTCDate();
      let month = getMonth(startOfToday())+1;//Date.today().getMonth() + 1;// as in array jan = 0
      let year = getYear(startOfToday());//Date.today().getFullYear();
      let PerPeyPeriod1 = true;

        if (tday <= 15) {

            this.dateFrom = month + '/01/' + year;
            this.dateTo = month + '/15/' + year;

        } else {
            //let t = new Date();
            //getDate  day of month
            //startOfToday ==now
            //lastDayOfMonth actually last DATE of month like 9/30/2017
            let lastDayOfMonthLocal = getDate(lastDayOfMonth(startOfToday()));//new Date(t.getFullYear(), t.getMonth() + 1, 0).getUTCDate();
            this.dateFrom = month + '/16/' + year;
            this.dateTo = month + '/' + lastDayOfMonthLocal + '/' + year;
            PerPeyPeriod1 = false;
        }

        this.recipientsCollection = this.afs.collection('recipients');
    this.recipientObservable = this.recipientsCollection.valueChanges();



    this.sub = this.recipientObservable.subscribe((r) =>{ for (let index = 0; index < r.length; index++) {
      let rmodel =  {} as RecipientModel;
          rmodel.RecipientName = r[index].RecipientName;
          rmodel.TotalMonthlyHours = r[index].TotalhoursPerMonth;
          rmodel.allowableHoursPerWeek = r[index].AllowableHoursPerWeek;
          rmodel.PrevPaymentPeriodLastWeekHours=r[index].RemainingHoursFromLastPayPeriod;
          rmodel.DocId = r[index].DocId;
          if(PerPeyPeriod1){
            rmodel.PayPeriodTotalHours = r[index].HoursPerPeyPeriod1;
          }else{
            rmodel.PayPeriodTotalHours = r[index].HoursPerPeyPeriod2;
          }

          this.RecipientsInfo.push(rmodel);
          console.log(this.RecipientsInfo);
    } });



      this.pickerStart.nativeElement.value=this.dateFrom;
     this.pickerEnd.nativeElement.value=this.dateTo;

  });



    }
    onWeek1Changed($event){
      this.weekTotal1=this.weekTotal1+Number($event.hourDiff);
      this.CalcTotalHour();
    }

  private CalcTotalHour() {
    this.totalHourAll = this.weekTotal1 + this.weekTotal2 + this.weekTotal3 + this.weekTotal4;
  }

    onWeek2Changed($event){
      this.weekTotal2=this.weekTotal2+Number($event.hourDiff);
      this.CalcTotalHour();
    }
    onWeek3Changed($event){
      this.weekTotal3=this.weekTotal3+Number($event.hourDiff);
      this.CalcTotalHour();
    }
    onWeek4Changed($event){
      this.weekTotal4=this.weekTotal4+Number($event.hourDiff);
      this.CalcTotalHour();
    }

    calc(){

      this.timesheets.forEach((timesheet) =>{
         timesheet.dateFrom = this.pickerStart.nativeElement.value;
         timesheet.dateTo = this.pickerEnd.nativeElement.value;
         timesheet.calc();

         this.weekTotal1=this.weekTotal1+timesheet.totalWeek1;
         this.weekTotal2=this.weekTotal2+timesheet.totalWeek2;
         this.weekTotal3=this.weekTotal3+timesheet.totalWeek3;
         this.weekTotal4=this.weekTotal4+timesheet.totalWeek4;
      });
      this.calculated=!this.calculated;
      this.CalcTotalHour();

      this.sub.unsubscribe();
    }
    saveClients(){
      this.timesheets.forEach((timesheet) =>{
        timesheet.save();
     });

    }
    resetClients(){
      this.timesheets.forEach((timesheet) =>{
        timesheet.reset();

        this.weekTotal1=0;
        this.weekTotal2=0;
        this.weekTotal3=0;
        this.weekTotal4=0;
     });
     this.calculated=!this.calculated;
     this.CalcTotalHour();

    }

}
