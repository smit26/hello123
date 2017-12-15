import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-order',
  templateUrl: 'work-order.html',
})
export class WorkOrderPage {

  public order: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get("order")) {
      this.order = navParams.get("order");  
      if(this.order.GPSCOORDINATES.length > 0) {
        this.order.GPSCOORDINATES = this.order.GPSCOORDINATES
          .split(',') 
          .map(coordinate => Number(coordinate).toFixed(6))
          .join(',')
      } 
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkOrderPage');
  }

}
