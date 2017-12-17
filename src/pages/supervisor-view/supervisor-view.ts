import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



@IonicPage()
@Component({
  selector: 'page-supervisor-view',
  templateUrl: 'supervisor-view.html',
})
export class SupervisorViewPage {

  public supervisorData
  public open: Array<any> = []
  public close: Array<any> = []
  public late: Array<any> = []
  public inProgress: Array<any> = []
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {

    // this.data.getSupervisorData(this.data.getNetworkStatus())
    //   .subscribe((data: any) => {
    //     this.supervisorData = JSON.parse(data.json().body)
    //     this.open = this.supervisorData[0]['OPEN']
    //     this.close = this.supervisorData[1]['CLOSE']
    //     this.late = this.supervisorData[2]['LATE']
    //     this.inProgress = this.supervisorData[3]['INPROGRESS']        
    //   }, err => console.log(err))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorViewPage');
  }

  getList(title,selection){
    // this.navCtrl.push(SupervisorDetailPage,{title:title,selection:selection});
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Demo Version',
      subTitle: 'This feature is not available in demo version',
      buttons: ['OK']
    });
    alert.present();
  }


}
