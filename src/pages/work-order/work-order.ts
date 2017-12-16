import { OperationCategoryPage } from './../operation-category/operation-category';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment'
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-work-order',
  templateUrl: 'work-order.html',
})
export class WorkOrderPage {

  public order: any = {}
  constructor(public data: DataProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
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
  }

  startTracking() {
    console.log('start tracking')
    // this.order.GPSCOORDINATES = `${resp.coords.latitude.toFixed(6)},${resp.coords.longitude.toFixed(6)}`
    this.order.STARTDATE = new Date() 
    this.order.FINISHDATE = new Date() 
    this.order.STARTTIME = moment(new Date()).format('HHmmss')
    this.order.FINISHTIME = new Date()   
    delete this.order.photos
    this.data.updateWorkOrder(this.order)
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log('I have location')
    //   this.order.GPSCOORDINATES = `${resp.coords.latitude.toFixed(6)},${resp.coords.longitude.toFixed(6)}`
    //   this.order.STARTDATE = new Date() 
    //   this.order.FINISHDATE = new Date() 
    //   this.order.STARTTIME = moment(new Date()).format('HHmmss')
    //   this.order.FINISHTIME = new Date()   
    //   this.data.updateWorkOrder(this.order)
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
  }

  showOperations(order){
    if(order.STARTTIME == '000000') return this.showAlert2()
    this.navCtrl.push(OperationCategoryPage, { order: order });
  }

  showAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Start Work!',
      subTitle: 'Please start work to see operations',
      buttons: ['OK']
    });
    alert.present();
  }

}
