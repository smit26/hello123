import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-history',
  templateUrl: 'notification-history.html',
})
export class NotificationHistoryPage {
  notifications = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.notifications = navParams.get("selection");
    this.notifications.map(notification => { 
      notification.NOTIFDATE = new Date(parseInt(notification.NOTIFDATE.substr(6)))
      //notification.NOTIFTIME = this.data.parseTime(notification.NOTIFTIME)
      notification.EQUIPSTOPS = notification.EQUIPSTOPS.substr(0,4)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationHistoryPage');
  }

}
