import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getDay, startOfToday, getMonth, getYear, parse, lastDayOfMonth, getDate, differenceInDays } from "date-fns";
import { of, Observable, Subject } from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';




@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']

})

export class TimesheetComponent implements OnInit {
  @Input() recipientName="Gohar";
  @Input() DocId="";
  totalWeek1=0;
  totalWeek2=0;
  totalWeek3=0;
  totalWeek4=0;
  totalHourAllWeeks=0
  @Input() totalHours = 33.24;
  @Input() recipientMonthlyMaxHours=66.24;
  @Input() allowableHoursPerWeek = 13;
  @Input() remainerHoursFromLastWeek=4;
  dayNameHourFieldsClear: Array<{dayName:string,hoursPerDay:number}> = [{dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0}];

  dayNameHourFields: Array<{dayName:string,hoursPerDay:number}> = [{dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0},
  {dayName:"Sunday",hoursPerDay:0},{dayName:"Monday",hoursPerDay:0},{dayName:"Tuesday",hoursPerDay:0},{dayName:"Wednesday",hoursPerDay:0},{dayName:"Thursday",hoursPerDay:0},{dayName:"Friday",hoursPerDay:0},{dayName:"Saturday",hoursPerDay:0}];
   dateFrom = "04/1/2020";
   dateTo = "04/15/2020";

      @Output() week1Changed = new EventEmitter<{hourDiff:number}>();
      @Output() week2Changed = new EventEmitter<{hourDiff:number}>();
      @Output()week3Changed = new EventEmitter<{ hourDiff:number }>();
      @Output()week4Changed = new EventEmitter<{ hourDiff:number }>();

      setTotalWeek1(value:number) {
        let hourDiff=value - this.totalWeek1;
        this.week1Changed.emit({hourDiff});
        this.totalWeek1 = value

    }
    setTotalWeek2(value:number) {
      let hourDiff=value - this.totalWeek2;
      this.week2Changed.emit({hourDiff});
      this.totalWeek2 = value

  }
  setTotalWeek3(value:number) {
    let hourDiff=value - this.totalWeek3;
    this.week3Changed.emit({hourDiff});
    this.totalWeek3 = value

}
setTotalWeek4(value:number) {
  let hourDiff=value - this.totalWeek4;
  this.week4Changed.emit({hourDiff});
  this.totalWeek4 = value

}

  constructor(private afs: AngularFirestore) {
    //this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

   }

  ngOnInit() {
  }
  public calc(){

    let dateFromDate = parse(this.dateFrom, 'MM/dd/yyyy', new Date());//Date.parse(this.dateFrom);
    let dateToDate = parse(this.dateTo, 'MM/dd/yyyy', new Date());//Date.parse(this.dateTo);
    let fromMonthDay = getDate(dateFromDate);//dateFromDate.getDay();
    let toMonthDay = getDate(dateToDate);//dateToDate.getDay()
    let fromWeekDay = getDay(dateFromDate);//dateFromDate.getDay();
    let toWeekDay = getDay(dateToDate);//dateToDate.getDay()
    let cycleLenth=differenceInDays(dateToDate,dateFromDate) + 1;
    let totalHoursFloor = Math.floor(this.totalHours);
    let totalHoursDecimal = Number((this.totalHours - totalHoursFloor).toFixed(4));
    let hourPerDay = Math.floor(this.totalHours / cycleLenth);
    let modulus = totalHoursFloor % cycleLenth;
//put hours equally in days
    for (let index = fromWeekDay; index <=( cycleLenth+fromWeekDay-1); index++) {
      this.dayNameHourFields[index].hoursPerDay=hourPerDay
      if (modulus>0){
        this.dayNameHourFields[index].hoursPerDay=this.dayNameHourFields[index].hoursPerDay+1;
        modulus = modulus-1;
      }
      if(index==cycleLenth+fromWeekDay-2){
        this.dayNameHourFields[index].hoursPerDay=hourPerDay+hourPerDay-1;
      }
      if(index==cycleLenth+fromWeekDay-1){
        this.dayNameHourFields[index].hoursPerDay=Number((1+Number(totalHoursDecimal.toFixed(4))).toFixed(4));
      }

    //   }
      //generate weekdays numbers of week
     this.dayNameHourFields[index].dayName=this.dayNameHourFields[index].dayName
                                                                      +' '+fromMonthDay++;

    }
    //put remainder hours from last week to day before first day of pay period
    if(fromWeekDay>0){
        this.dayNameHourFields[fromWeekDay-1].hoursPerDay=Math.ceil(this.remainerHoursFromLastWeek);
    }else{
      this.remainerHoursFromLastWeek=0;
    }

    this.totalWeek1 = this.dayNameHourFields.filter((a, i) => i <= 6).reduce((a, b) => a + b.hoursPerDay, 0);
    let week1SurplusHour=this.totalWeek1-this.allowableHoursPerWeek;
    //this.normalizeHoures(week1SurplusHour,7,fromWeekDay,6);
//makes sure that week hours<allowableHoursPerWeek
    if(week1SurplusHour>0) {
      this.dayNameHourFields[7].hoursPerDay+=week1SurplusHour;
      for (let index = fromWeekDay; index <= 6 && week1SurplusHour>0; week1SurplusHour--) {
        if(this.dayNameHourFields[index].hoursPerDay>0){
         this.dayNameHourFields[index].hoursPerDay = this.dayNameHourFields[index].hoursPerDay -1;
         this.totalWeek1--
        }
        if (index==6&&week1SurplusHour>0){
          index = fromWeekDay;
        }else{
          index++
        }

      }

    }
    this.totalWeek2 = this.dayNameHourFields.filter((a, i) => 6 < i && i <= 13).reduce((a, b) => a + b.hoursPerDay, 0);
    let week2SurplusHour=this.totalWeek2-this.allowableHoursPerWeek;
    if(week2SurplusHour>0){
      this.dayNameHourFields[14].hoursPerDay+=week2SurplusHour;
      for (let index = 7;  index <= 13 && week2SurplusHour>0; week2SurplusHour--) {
        if(this.dayNameHourFields[index].hoursPerDay >0){
        this.dayNameHourFields[index].hoursPerDay = this.dayNameHourFields[index].hoursPerDay -1;
        this.totalWeek2--
        }
        if (index==13&&week2SurplusHour>0){
          index = 7;
        }else{
          index++
        }

      }
    }
    // let week3SurplusHour=week3Total-this.allowableHoursPerWeek;

    // if(week3SurplusHour>0){
    //   this.dayNameHourFields[21].hoursPerDay+=week3SurplusHour;
    //   for (let index = 14;  index <= 20 && week3SurplusHour>0; week3SurplusHour--) {
    //     this.dayNameHourFields[index].hoursPerDay = this.dayNameHourFields[index].hoursPerDay -1;
    //     index++

    //   }
    // }
    // this.totalWeek1 = this.dayNameHourFields.filter((a, i) => i <= 6).reduce((a, b) => a + b.hoursPerDay, 0);
    // this.totalWeek2 = this.dayNameHourFields.filter((a, i) => 6 < i && i <= 13).reduce((a, b) => a + b.hoursPerDay, 0);
    this.totalWeek3 = this.dayNameHourFields.filter((a, i) => 13 < i && i <= 20).reduce((a, b) => a + b.hoursPerDay, 0);
    this.totalWeek4 = this.dayNameHourFields.filter((a, i) => 20 < i && i <= 27).reduce((a, b) => a + b.hoursPerDay, 0);
    this.totalHourAllWeeks=this.totalWeek1+this.totalWeek2+this.totalWeek3+this.totalWeek4-Math.ceil(this.remainerHoursFromLastWeek);


  }

  reset(){
    this.dayNameHourFields.forEach((element,index) => {
      element.dayName = this.dayNameHourFieldsClear[index].dayName;
      element.hoursPerDay = this.dayNameHourFieldsClear[index].hoursPerDay;
    });
    this.totalWeek1 = 0;
    this.totalWeek2 = 0;
    this.totalWeek3 =  0;
    this.totalWeek4 = 0;
    this.totalHourAllWeeks=0;


  }

  normalizeHoures(weekSurplusHours:number,dayWherePutHours:number, weekFrom:number,weekTo:number){
    if(weekSurplusHours>0){
      this.dayNameHourFields[dayWherePutHours].hoursPerDay+=weekSurplusHours;
      for (let index = weekFrom; index < weekTo && weekSurplusHours>0; weekSurplusHours--) {
        this.dayNameHourFields[index].hoursPerDay = this.dayNameHourFields[index].hoursPerDay -1;
        index++

     }
    }

  }

  onKeyUp(day:number){

    this.dayNameHourFields[day].hoursPerDay = Number(this.dayNameHourFields[day].hoursPerDay);
    console.log(this.dayNameHourFields);
    let newTOtalWeek1=this.dayNameHourFields.filter((a, i) => i <= 6).reduce((a, b) => a + b.hoursPerDay, 0);
    console.log(newTOtalWeek1);
    this.setTotalWeek1(newTOtalWeek1);

    let newTOtalWeek2 = this.dayNameHourFields.filter((a, i) => 6 < i && i <= 13).reduce((a, b) => a + b.hoursPerDay, 0);
    this.setTotalWeek2(newTOtalWeek2);
    let newTOtalWeek3 = this.dayNameHourFields.filter((a, i) => 13 < i && i <= 20).reduce((a, b) => a + b.hoursPerDay, 0);
    this.setTotalWeek3(newTOtalWeek3);
    let newTOtalWeek4 = this.dayNameHourFields.filter((a, i) => 20 < i && i <= 27).reduce((a, b) => a + b.hoursPerDay, 0);
    this.setTotalWeek4(newTOtalWeek4);
    this.totalHourAllWeeks=this.totalWeek1+this.totalWeek2+this.totalWeek3+this.totalWeek4-Math.ceil(this.remainerHoursFromLastWeek);

  };

  save(){
    let remainingHoursForThisPayPeriod=0;
    if(this.totalWeek4>0){
      remainingHoursForThisPayPeriod=this.totalWeek4;
    }else if(this.totalWeek3>0){
      remainingHoursForThisPayPeriod=this.totalWeek3;
    }
    const doc = this.afs.doc('recipients/'+this.DocId);
     doc.update({ RemainingHoursFromLastPayPeriod: remainingHoursForThisPayPeriod })
     .then(() => console.log('success'))
     .catch((err) => console.log(err));

  }

}
