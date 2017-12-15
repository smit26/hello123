import { Api } from './../api/api';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';

@Injectable()
export class User {
  _user: any;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) { }


  // login(accountInfo: any) {
  //   let seq = this.api.post('login', accountInfo).share();

  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
  //     if (res.status == 'success') {
  //       this._loggedIn(res);
  //     } else {
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });

  //   return seq;
  // }

  login(account) {
    return this.afAuth.auth.signInWithEmailAndPassword (account.email, account.password)
  }

  signup(accountInfo: any) {
    // let seq = this.api.post('signup', accountInfo).share();
    // seq.subscribe((res: any) => {
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  logout() {
    this._user = null;
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }

  isLoggedIn() {
    return this.afAuth.authState
  }

}
