import { DataProvider } from './../../providers/data/data';
import { Api } from './../../providers/api/api';
import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-work-orders',
  templateUrl: 'work-orders.html',
})
export class WorkOrdersPage {

  public workOrdersCollection: Observable<any[]> 
  public isOnline: boolean = false

  constructor(public data: DataProvider, public navCtrl: NavController, public appRef: ApplicationRef, public db: AngularFirestore, public navParams: NavParams, public api: Api) {
    this.workOrdersCollection = db.collection('workOrders').snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.workOrdersCollection.subscribe(data => {
      // this.data.workOrders = data
      this.data.getWorkOrderPhotos(data)
      // this,appRef.tick()
    })

    // this.data.workOrdersChange.subscribe(wos => {
    //   this.data.workOrders = wos
    //   this.appRef.tick()
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkOrdersPage');
    
  }

  getWorkOrders() {
     this.data.getWorkOrders()  
  }

}