import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: 'almir@bind.ba',
    password: '123456'
  };

  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
  public data: DataProvider) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.user.isLoggedIn().subscribe(res => {
      if (res && res.uid) {
        this.navCtrl.push(MainPage);
      }
    })

  }

  doLogin() {
    this.user.login(this.account).then((resp) => {
      this.data.getWorkOrders()
      this.navCtrl.push(MainPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
