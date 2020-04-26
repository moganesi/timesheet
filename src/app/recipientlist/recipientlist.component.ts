import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import{Recipient} from '../recipient';
import { Observable, Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-recipientlist',
  templateUrl: './recipientlist.component.html',
  styleUrls: ['./recipientlist.component.css']
})
export class RecipientlistComponent implements OnInit {
//   dataSource: Recipient[] = [
//     {AllowableHoursPerWeek: 16,
// DocId: "8D4YQpLdH0dYaGUoTv7l",
// HoursPerPeyPeriod1: 33,
// HoursPerPeyPeriod2: 33.24,
// RecipientName: "Gohar",
// RemainingHoursFromLastPayPeriod: 7,
// TotalhoursPerMonth: 66.24}
//   ];
  displayedColumns: string[] = ['RecipientName', 'TotalhoursPerMonth', 'AllowableHoursPerWeek',
   'RemainingHoursFromLastPayPeriod','DocId','HoursPerPeyPeriod1','HoursPerPeyPeriod2','actions'];
  recipientsCollection: AngularFirestoreCollection<Recipient>;
  recipientObservable: Observable<Recipient[]>;
  // sub:Subscription;
  // Recipients:Array<Recipient>=[]


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.recipientsCollection = this.afs.collection('recipients');
    this.recipientObservable = this.recipientsCollection.valueChanges();
    // this.sub = this.recipientObservable.subscribe((r) =>
    // { for (let index = 0; index < r.length; index++) {
    //   let rmodel =  {} as Recipient;
    //       rmodel.RecipientName = r[index].RecipientName;
    //       rmodel.TotalhoursPerMonth = r[index].TotalhoursPerMonth;
    //       rmodel.AllowableHoursPerWeek = r[index].AllowableHoursPerWeek;
    //       rmodel.RemainingHoursFromLastPayPeriod=r[index].RemainingHoursFromLastPayPeriod;
    //       rmodel.DocId = r[index].DocId;
    //         rmodel.HoursPerPeyPeriod1 = r[index].HoursPerPeyPeriod1;

    //         rmodel.HoursPerPeyPeriod2 = r[index].HoursPerPeyPeriod2;


    //       this.dataSource.push(rmodel);

    // }});

  }

  onEdit(val:Recipient){
     console.log(val);
  }

  onDelete(val:Recipient){

  }
  onAdd(){

  }

 }

