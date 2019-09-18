import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DataServices } from '../providers/dataservice';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HopitauxPage } from '../pages/hopitaux/hopitaux';
import { PharmaciesPage, TabP1, TabP2 } from '../pages/pharmacies/pharmacies';
import { Tab1, Tab2 } from '../pages/hopitaux/hopitaux';
import { AutresPage, TabA2, TabA1 } from '../pages/autres/autres';
import { MapContentPage } from '../pages/maps/maps';

//Native Components
import { GoogleMaps, Spherical } from '@ionic-native/google-maps';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HopitauxPage,
    PharmaciesPage,
    Tab1,
    Tab2,
    TabP1,
    TabP2,
    TabA1,
    TabA2,
    AutresPage,
    MapContentPage
  ],
  imports: [
    
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Précédent',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapContentPage,
    ListPage,
    HopitauxPage,
    PharmaciesPage,
    Tab2,
    Tab1,
    TabP1,
    TabP2,
    TabA1,
    TabA2,
    AutresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HopitauxPage,
    PharmaciesPage,
    Tab1,
    Tab2,
    TabP1,
    TabP2,
    TabA1,
    TabA2,
    AlertController,
    SQLite,
    GoogleMaps,
    AutresPage,
    Spherical,
    DataServices,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
