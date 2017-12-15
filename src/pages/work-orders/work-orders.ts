import { Api } from './../../providers/api/api';
import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-work-orders',
  templateUrl: 'work-orders.html',
})
export class WorkOrdersPage {

  public workOrdersCollection: Observable<any[]> 
  public isOnline: boolean = false
  public workOrders: any = []

  constructor(public navCtrl: NavController, public appRef: ApplicationRef, public db: AngularFirestore, public navParams: NavParams, public api: Api) {
    this.workOrdersCollection = db.collection('workOrders').snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.workOrdersCollection.subscribe(data => {
      this.workOrders = data
      this,appRef.tick()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkOrdersPage');
    
  }

  getWorkOrders() {
    // this.api.post('login', {username: "almir@bind.ba", password: "12345678987654321"})
    //   .subscribe(tokens => console.log(tokens))
    const token = 'eyJraWQiOiJnWlwvaVIzUVpSUVFuYzFGbE40TzdvR1haZmt3R05CV01nTmJXQWJJZWkrYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxM2EyNGQxNi1kZjIxLTRmYWItOTFlOC0yNWE1NTc3Yzc5NTUiLCJhdWQiOiIybmQ5bzBqNTllczZxN3Y3dGRpY2FsNWg0NSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBjYTM3ODg1LWUxYTYtMTFlNy04ZmJhLTY1NzBmNDY4ZTI5MCIsInRva2VuX3VzZSI6ImlkIiwiY3VzdG9tOkxhc3RfTmFtZSI6Ilp1bGljIiwiYXV0aF90aW1lIjoxNTEzMzQ4ODk1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl8zSlp1bExXOWoiLCJjb2duaXRvOnVzZXJuYW1lIjoiYWxtaXIiLCJleHAiOjE1MTMzNTI0OTUsImlhdCI6MTUxMzM0ODg5NSwiZW1haWwiOiJhbG1pckBiaW5kLmJhIn0.eXv_qzdJgJazTj92oFlf7AY1wSH8gWSKUMkm7ckqURCc988GAgrNq8qrfC5WsL_1PfXsVcZFP2qPLFqL-K1W5ft0Ig-j4hx2g75cX7Su5WLaLXUOwQ1PDpsufr035ixm6xZXTNY28UAw-Kz2SD1g4nZOBH5HYYLTpacIdnTGP1cm4b7No_j2-ZOBwAEOTgTQL70LwRffeCaP2iJWIoKbyzZqBvVu3kUDHtIuPR4lvMzL4dqpGr7knqpmbx13cKdlL4Qqx8ldwePRVrrUj6A9AD1lEKfLorXWLuv0u0LpXcXk_IQhegvmdBPpAP4m9zJbOazpN1oteR-ygMW8NKTmxg'
    this.api.post('refreshWorkOrders', {token: token}).subscribe(data => console.log(data))    
  }

}
