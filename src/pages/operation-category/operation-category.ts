import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { groupBy } from 'lodash'
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { OperationPage } from '../operation/operation';

@IonicPage()
@Component({
  selector: 'page-operation-category',
  templateUrl: 'operation-category.html',
})
export class OperationCategoryPage {
  order;
  operations;
  workOrders: Array<any> = []
  public operationCategories: any = []
  public openOperations: any=[]
  public objectKeys = Object.keys;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public data: DataProvider) {

    this.order = navParams.get("order");
  }

  ionViewDidEnter() {
    this.operationCategories = groupBy(this.order.OrderOperations.results, 'DESCRIPTIONHEADING')
    console.log('HERE ARE THE OPERATION CATEGORIES ', this.operationCategories)

    this.openOperations = groupBy(this.order.OrderOperations.results, "STATE == ''")
    console.log('HERE ARE THE OPEN OPERATION  ', this.openOperations)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationCategoryPage');
  }

  showOperations(categoryName){
    
    this.navCtrl.push(OperationPage, { order: this.order , categoryName});
  }

  showAll(){
    
    this.navCtrl.push(OperationPage, {order: this.order});
  }

}
