import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SupervisorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-detail',
  templateUrl: 'supervisor-detail.html',
})
export class SupervisorDetailPage {

  public items = [];
  public notifications = [];
  currentUser: any = {}
  public title;
  public selection;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    /*this.title = navParams.get("title");
      this.items = navParams.get("selection");
      console.log('Data received for Supervisor details ', this.items)
      this.userProvider.currentUserChange 
      .subscribe(currentUser => {
        this.currentUser = currentUser
        console.log(currentUser)
      })*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorDetailPage');
  }

}
