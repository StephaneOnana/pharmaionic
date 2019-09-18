import { Component, Injectable, Inject, NgZone } from '@angular/core';
import { NavController, Platform, ModalController, AlertController,ViewController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker, GoogleMapsAnimation, MapType, LocationService, MyLocation, GoogleMapOptions,Spherical, ILatLng, GoogleMapsMapTypeId
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Http, HttpModule } from '@angular/http';
import { DataServices } from '../../providers/dataservice';
import{ MapContentPage } from '../maps/maps';
import { TabsPage } from '../tabs/tabs';
import {PharmaciesPage} from '../pharmacies/pharmacies';
import { HttpClientModule, HttpClient } from '@angular/common/http';



const DATABASE_FILENAME: string ='quickhealth.db';
const ID_JSON="9934d7c8ee514aa58544a43691e2acf9";
const MAX=13;
const DISTANCE=1000;

@Component({
  selector: 'page-hopitaux',
  templateUrl: 'hopitaux.html'
})
@Injectable()
export class HopitauxPage {
  pet:string="puppies";
  isAndroid:boolean=false;
  rootPage:any=Tab1;
  isActived:any=1;
  de:any;
  concerned:Array<{}>;
  selectedItem={
    nom:"Mohammad"
  };

  //*************************
  private db: SQLiteObject;
  donnee=[];
  public versionJSON:any;
  public pharmacies=[];
  public hopitaux=[];
  public divers=[];
  public hopitauxPhotos=[];

  public dimunitifPharmacies=[];
    public latPharmacies=[];
    public lonPharmacies=[];
    public pointReferencesPharmacies=[];
    public comPharmacies=[];

    public dimunitifHopitaux=[];
    public latHopitaux=[];
    public lonHopitaux=[];
    public pointReferencesHopitaux=[];
    public comHopitaux=[];
    public coordHopitaux=[];
    public pointReference=[];


     public hopitauxAP=[];
     public dimunitifHopitauxAP=[];
     public latHopitauxAP=[];
     public lonHopitauxAP=[];
     public pointReferenceAP=[];
     public hopitauxPhotosAP=[];
     public comHopitauxAP=[];
     distance:any;
    public maPosition:any;


    public latDivers=[];
    public lonDivers=[];
    public pointReferencesDivers=[];
    public comDivers=[];
    public typesDivers=[];
    public dimunitifDivers=[];
//***********************

  constructor(public navCtrl: NavController, platform:Platform, public modalCtrl:ModalController, private sqlite: SQLite, public alertCtrl: AlertController, private http: HttpClient, private dataservice: DataServices, public viewCtrl: ViewController, private zone: NgZone, private spherical: Spherical, public geoLocation: Geolocation) {
    this.isAndroid=platform.is('android');
    this.createDatabaseFile();
    
  }



  public createDatabaseFile(): void{
    this.sqlite=new SQLite();
    this.sqlite.create({
      name: DATABASE_FILENAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db=db;
        this.createTables();
        //this.putDatas();
        this.getDatasProximite();
        //this.updateTables();
      })
      .catch(e => console.log(e));

  }

  public createTables():void {

    /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `PHARMACIES` (`idPharmacie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL ,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{
      
    }).catch(e=>console.log(e));
    */

    this.db.executeSql('CREATE TABLE IF NOT EXISTS `HOPITAUX` (`idHopital` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{

    }).catch(e=>console.log(e));


    /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
      
    }).catch(e=>console.log(e));
    */
  }
  

  public putDatas():void{
    this.db.executeSql('DELETE FROM `HOPITAUX`', {}).then(()=>{
      
    }).catch(e=>console.log(e));

      this.hopitaux=[];
      this.dimunitifHopitaux=[];
      this.coordHopitaux=[];
      this.pointReference=[];
      this.comHopitaux=[];
      this.latHopitaux=[];
      this.lonHopitaux=[];

      this.dataservice.getDatas().subscribe(data=>{this.hopitaux=data.hopitaux;this.dimunitifHopitaux=data.dimunitifsHopitaux;this.coordHopitaux=data.coordHopitaux;this.pointReference=data.pointReferencesHopitaux;this.comHopitaux=data.commentairesHopitaux;
     for(var i=0; i<data.hopitaux.length; i++){
       

        this.db.executeSql(' INSERT INTO `HOPITAUX` (nom,diminutif, latitude, longitude, pointReference, commentaires) VALUES(\'' + this.hopitaux[i] + '\',\'' + this.dimunitifHopitaux[i] + '\', '+ this.coordHopitaux[i][0] +','+ this.coordHopitaux[i][1] +',\'' + this.pointReference[i] + '\',\'' + this.comHopitaux[i] + '\')', {}).then(()=>{
      
    }).catch(e=>console.log(e));
        
     }
     });
     
  }

  public getDatas():void{

      this.hopitaux=[];
      this.dimunitifHopitaux=[];
      this.coordHopitaux=[];
      this.pointReference=[];
      this.comHopitaux=[];
      this.latHopitaux=[];
      this.lonHopitaux=[];
      this.hopitauxPhotos=[];
     
     this.hopitauxAP=[];
     this.dimunitifHopitauxAP=[];
     this.latHopitauxAP=[];
     this.lonHopitauxAP=[];
     this.pointReferenceAP=[];
     this.hopitauxPhotosAP=[];


      this.db.executeSql('SELECT * FROM `HOPITAUX`', {}).then((data)=>{

        if(data==null){
          return ;
        }
        if(data.rows){
          if(data.rows.length>0){
            for(var i=0;i<data.rows.length;i++){
                  this.hopitaux.push(data.rows.item(i).nom);
                  this.dimunitifHopitaux.push(data.rows.item(i).diminutif);
                  this.latHopitaux.push(data.rows.item(i).latitude);
                  this.lonHopitaux.push(data.rows.item(i).longitude);
                  this.pointReference.push(data.rows.item(i).pointReference);
                  this.comHopitaux.push(data.rows.item(i).commentaires);
                  this.hopitauxPhotos.push("H"+this.randomInt(1,MAX));
            }
          }
        }
      
    }).catch(e=>console.log(e));

  }

 
  public getDatasProximite():void{
     
     this.hopitauxAP=[];
     this.dimunitifHopitauxAP=[];
     this.latHopitauxAP=[];
     this.lonHopitauxAP=[];
     this.pointReferenceAP=[];
     this.hopitauxPhotosAP=[];
      
      this.hopitaux=[];
      this.dimunitifHopitaux=[];
      this.coordHopitaux=[];
      this.pointReference=[];
      this.comHopitaux=[];
      this.latHopitaux=[];
      this.lonHopitaux=[];
      this.hopitauxPhotos=[];

     this.getDatas();
    for(var i=0;i<this.hopitaux.length;i++){

          /*let p=this.getMyLocation();
          let locationB: ILatLng = {
            lat: this.latHopitaux[i],
            lng: this.lonHopitaux[i]
          };
          this.distance=this.spherical.computeDistanceBetween(this.getMyLocation(), locationB);
          if(this.distance<=DISTANCE){*/
          this.hopitauxAP.push(this.hopitaux[i]);
          this.dimunitifHopitauxAP.push(this.dimunitifHopitaux[i]);
          this.latHopitauxAP.push(this.latHopitaux[i]);
          this.lonHopitauxAP.push(this.lonHopitaux[i]);
          this.pointReferenceAP.push(this.pointReference[i]);
          this.comHopitauxAP.push(this.comHopitaux[i]);
          this.hopitauxPhotosAP.push("H"+this.randomInt(1,MAX));
         // }
          
    }

  }


  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

openMap(){
  let modal=this.modalCtrl.create(MapContentPage);
  modal.present();
}

changeGlobal(){
   ///document.getElementById('btn1').style.color="red"; 
}

change(){
  //this.zone.run(()=>{this.navCtrl.setRoot(TabsPage);})
  this.rootPage=Tab2;
  this.isActived=2;
  document.getElementById('2').style.color="red";
}

change1(){
  this.rootPage=Tab1;
  this.isActived=1;
  document.getElementById('2').style.fontSize="#f4f4f4";
}

}


//------------------------------

@Component({
  selector:'tab1',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class Tab1 {

  map: GoogleMap;
  hopitauxLon=[];
  hopitauxL=[];
  hopitaux=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: HopitauxPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.hopitauxL=this.h.latHopitaux;
    this.hopitauxLon=this.h.lonHopitaux;
    this.pointReference=this.h.pointReference;
    this.hopitaux=this.h.hopitaux;
    this.maPosition=this.h.maPosition;
  }

  ionViewDidLoad() {
    this.h.createDatabaseFile();
    this.loadMap();
  }

  

  loadMap() {

    // Create a map after the view is ready and the native platform is ready.


    let options: GoogleMapOptions = {
    mapType: 'MAP_TYPE_HYBRID'
    }

    this.map = GoogleMaps.create('map_canvas', options);

    let ionic: LatLng = new LatLng(this.hopitauxL[0], this.hopitauxLon[0]);

    for(var i=0; i<this.hopitaux.length; i++){
         ionic = new LatLng(this.hopitauxL[i], this.hopitauxLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.hopitaux[i],
          snippet:''+this.pointReference[i],
          animation: GoogleMapsAnimation.DROP,
          icon:'blue',
        };

        this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
              marker.showInfoWindow();
      });
        

    }

    //let p = this.getMyLocation();
    //ionic=new LatLng(p.lat, p.lng);
        this.map.addMarker({
      position:ionic,
      title:'Ma position',
      snippet:'Je suis ici!',
      animation:GoogleMapsAnimation.DROP,
      icon:'blue'
    })


        this.map.animateCamera({
          target:ionic,
          zoom:18,
          tilt:10
          }).then(()=>{
             

          });

            // create CameraPosition
        let position: CameraPosition<any> = {
          target:ionic,
         zoom:18,
          tilt:10
        };
    }
 }


//*********************

@Component({
  selector:'tab2',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class Tab2 { 

 map: GoogleMap;
  hopitauxLon=[];
  hopitauxL=[];
  hopitaux=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: HopitauxPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.hopitauxL=this.h.latHopitaux;
    this.hopitauxLon=this.h.lonHopitaux;
    this.pointReference=this.h.pointReference;
    this.hopitaux=this.h.hopitaux;
    this.maPosition=this.h.maPosition;
  }

  ionViewDidLoad() {
    this.h.createDatabaseFile();
    this.loadMap();
  }



  loadMap() {

    // Create a map after the view is ready and the native platform is ready.


    let options: GoogleMapOptions = {
    mapType: 'MAP_TYPE_HYBRID'
    }

    this.map = GoogleMaps.create('map_canvas', options);

    let ionic: LatLng = new LatLng(this.hopitauxL[0], this.hopitauxLon[0]);

    for(var i=0; i<this.hopitaux.length; i++){
         ionic = new LatLng(this.hopitauxL[i], this.hopitauxLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.hopitaux[i],
          snippet:''+this.pointReference[i],
          animation: GoogleMapsAnimation.DROP,
          icon:'blue',
        };

        this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
              marker.showInfoWindow();
      });
        

    }

    /* let p=this.getMyLocation();
    ionic=new LatLng(p.lat, p.lng);*/
    ionic=new LatLng(this.hopitauxL[0], this.hopitauxLon[0]);
        this.map.addMarker({
      position:ionic,
      title:'Ma position',
      snippet:'Je suis ici!',
      animation:GoogleMapsAnimation.DROP,
      icon:'blue'
    })


        this.map.animateCamera({
          target:ionic,
          zoom:18,
          tilt:10
          }).then(()=>{
             

          });

            // create CameraPosition
        let position: CameraPosition<any> = {
          target:ionic,
         zoom:18,
          tilt:10
        };
        // move the map's camera to position
        //this.map.moveCamera(position);
    // No longer wait GoogleMapsEvent.MAP_READY event
    // ( except you use map.getVisibleRegion() )
  }

 }

