import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DataProvider } from '../../providers/data/data';
import { OperationDetailsPage } from '../operation-details/operation-details';

@IonicPage()
@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {


  order;
  operations;
  workOrders: Array<any> = []
  //public operationCategories: any = []
  categoryName;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public data: DataProvider) {
    this.order = navParams.get("order");
    this.categoryName = navParams.get("categoryName")
  }

  operationDetails(operation){
    this.navCtrl.push(OperationDetailsPage, {order: this.order, operation});
  }



  showAlert() {
    let alert = this.alertCtrl.create({
      //title: 'No documents found',
      subTitle: 'HELLO',
      buttons: ['OK']
    });
    alert.present();
  }

  updateOperation(operation: any, isGood: boolean) {
    isGood ? operation.STATE = 'G' : operation.STATE = 'NG'
    operation.isChanged = true
    this.order.operationChanged = true
    console.log(this.order)
    this.data.updateWorkOrder(this.order)
  }

}
