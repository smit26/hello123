import { MainPage } from './../pages';
import { User } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public user: User) { 
    this.user.isLoggedIn().subscribe(res => {
      if (res && res.uid) {
        this.navCtrl.push(MainPage);
      }
    })
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }


  
}
