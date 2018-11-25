import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import { LoginPage } from '../pages/Extra/login/login';
import { DashboardPage } from '../pages/Extra/dashboard/dashboard';
import { SignUpPage } from '../pages/Extra/sign-up/sign-up';
import { ProfilePage } from '../pages/MainPages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignUpPage;
  activePage: any;

  full: boolean = true;

  pages: Array<{ title: string, component: any, icon: any, color: string }>;

  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "flash", color: "yellowi" },
      { title: 'Profile', component: ProfilePage, icon: "ios-person", color: "whiter" },


    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.rootPage = DashboardPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }
  collapse() {
    this.full = false;
  }
  expand() {
    this.full = true;
  }

}
