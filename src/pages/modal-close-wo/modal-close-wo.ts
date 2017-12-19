import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkOrderPage } from './../work-order/work-order';
import { DataProvider } from './../../providers/data/data';
import { ToastController, ViewController,AlertController } from 'ionic-angular';

/**
 * Generated class for the ModalCloseWoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-close-wo',
  templateUrl: 'modal-close-wo.html',
})
export class ModalCloseWoPage {

  public order: any = {}
  public passCallback: any;  
  public closeOrderData: any = {
    confirmedForProduction: false,
    toolsReturned: false, 
    areaCleanedUp: false,
    requireFollowUp: false,
    comment: '' 
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public data: DataProvider,
    public toastCtrl: ToastController, public alertCtrl: AlertController, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.passCallback = this.navParams.get('callback')   
    this.order = this.navParams.get('order') 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCloseWoPage');
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Order has been closed',
      duration: 10000,
      position: position,
      cssClass: "toastClass",
    });

    toast.present(toast);

    this.navCtrl.push(WorkOrderPage, {callback: this.passCallback(this.closeOrderData), order: this.order})    
    this.viewCtrl.dismiss();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Closed',
      subTitle: 'Order has been closed',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(WorkOrderPage, {callback: this.passCallback(this.closeOrderData), order: this.order})    
    this.viewCtrl.dismiss();
  }

}
