import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AutresPage } from '../pages/autres/autres';
import { ListPage } from '../pages/list/list';
import { HopitauxPage } from '../pages/hopitaux/hopitaux';
import { PharmaciesPage } from '../pages/pharmacies/pharmacies';
import { TabsPage } from '../pages/tabs/tabs';
import {MapContentPage} from '../pages/maps/maps';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any, iconImg:string}>;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    
    this.pages = [
      { title: 'Acceuil', component: HomePage, iconImg:'home' },
      { title: 'Pharmacies', component: PharmaciesPage, iconImg:'boat' },
      { title: 'Hopitaux', component: HopitauxPage, iconImg:'flask' },
      { title: 'Autres', component: AutresPage, iconImg:'flask' },
      { title: 'Nous aider...', component: ListPage,  iconImg:'boat' },
      { title: 'A propos', component: ListPage,  iconImg:'paper-plane' },
    ];

   

  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.rootPage= HomePage;

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
