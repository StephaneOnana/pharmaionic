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
import { HttpClientModule, HttpClient } from '@angular/common/http';



const DATABASE_FILENAME: string ='quickhealth.db';
const ID_JSON="9934d7c8ee514aa58544a43691e2acf9";
const MAX=13;
const DISTANCE=1000;

@Component({
  selector: 'page-pharmacies',
  templateUrl: 'pharmacies.html'
})
@Injectable()
export class PharmaciesPage {
  pet:string="puppies";
  isAndroid:boolean=false;
  rootPage:any=TabP1;
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
  public divers=[];
  public pharmaciesPhotos=[];

  public dimunitifPharmacies=[];
    public latPharmacies=[];
    public lonPharmacies=[];
    public pointReferencesPharmacies=[];
    public compharmacies=[];

    public dimunitifpharmacies=[];
    public latpharmacies=[];
    public lonpharmacies=[];
    public pointReferencespharmacies=[];
    public coordpharmacies=[];
    public pointReference=[];


     public pharmaciesAP=[];
     public dimunitifpharmaciesAP=[];
     public latpharmaciesAP=[];
     public lonpharmaciesAP=[];
     public pointReferenceAP=[];
     public pharmaciesPhotosAP=[];
     public compharmaciesAP=[];
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

    this.db.executeSql('CREATE TABLE IF NOT EXISTS `PHARMACIES` (`idPharmacie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL ,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{
      
    }).catch(e=>console.log(e));
    


    /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
      
    }).catch(e=>console.log(e));
    */
  }
  

  public putDatas():void{
    this.db.executeSql('DELETE FROM `PHARMACIES`', {}).then(()=>{
      
    }).catch(e=>console.log(e));

      this.pharmacies=[];
      this.dimunitifpharmacies=[];
      this.coordpharmacies=[];
      this.pointReference=[];
      this.compharmacies=[];
      this.latpharmacies=[];
      this.lonpharmacies=[];

      this.dataservice.getDatas().subscribe(data=>{this.pharmacies=data.pharmacies;this.dimunitifpharmacies=data.dimunitifsPharmacies;this.coordpharmacies=data.coordPharmacies;this.pointReference=data.pointReferencesPharmacies;this.compharmacies=data.commentairesPharmacies;
     for(var i=0; i<data.pharmacies.length; i++){
       

        this.db.executeSql(' INSERT INTO `PHARMACIES` (nom,diminutif, latitude, longitude, pointReference, commentaires) VALUES(\'' + this.pharmacies[i] + '\',\'' + this.dimunitifpharmacies[i] + '\', '+ this.coordpharmacies[i][0] +','+ this.coordpharmacies[i][1] +',\'' + this.pointReference[i] + '\',\'' + this.compharmacies[i] + '\')', {}).then(()=>{
      
    }).catch(e=>console.log(e));
        
     }
     });
     
  }

  public getDatas():void{

      this.pharmacies=[];
      this.dimunitifpharmacies=[];
      this.coordpharmacies=[];
      this.pointReference=[];
      this.compharmacies=[];
      this.latpharmacies=[];
      this.lonpharmacies=[];
      this.pharmaciesPhotos=[];
     
     this.pharmaciesAP=[];
     this.dimunitifpharmaciesAP=[];
     this.latpharmaciesAP=[];
     this.lonpharmaciesAP=[];
     this.pointReferenceAP=[];
     this.pharmaciesPhotosAP=[];


      this.db.executeSql('SELECT * FROM `PHARMACIES`', {}).then((data)=>{

        if(data==null){
          return ;
        }
        if(data.rows){
          if(data.rows.length>0){
            for(var i=0;i<data.rows.length;i++){
                  this.pharmacies.push(data.rows.item(i).nom);
                  this.dimunitifpharmacies.push(data.rows.item(i).diminutif);
                  this.latpharmacies.push(data.rows.item(i).latitude);
                  this.lonpharmacies.push(data.rows.item(i).longitude);
                  this.pointReference.push(data.rows.item(i).pointReference);
                  this.compharmacies.push(data.rows.item(i).commentaires);
                  this.pharmaciesPhotos.push("P"+this.randomInt(1,MAX));
            }
          }
        }
      
    }).catch(e=>console.log(e));

  }

 
  public getDatasProximite():void{
     
     this.pharmaciesAP=[];
     this.dimunitifpharmaciesAP=[];
     this.latpharmaciesAP=[];
     this.lonpharmaciesAP=[];
     this.pointReferenceAP=[];
     this.pharmaciesPhotosAP=[];
      
      this.pharmacies=[];
      this.dimunitifpharmacies=[];
      this.coordpharmacies=[];
      this.pointReference=[];
      this.compharmacies=[];
      this.latpharmacies=[];
      this.lonpharmacies=[];
      this.pharmaciesPhotos=[];

     this.getDatas();
    for(var i=0;i<this.pharmacies.length;i++){

          
          this.pharmaciesAP.push(this.pharmacies[i]);
          this.dimunitifpharmaciesAP.push(this.dimunitifpharmacies[i]);
          this.latpharmaciesAP.push(this.latpharmacies[i]);
          this.lonpharmaciesAP.push(this.lonpharmacies[i]);
          this.pointReferenceAP.push(this.pointReference[i]);
          this.compharmaciesAP.push(this.compharmacies[i]);
          this.pharmaciesPhotosAP.push("H"+this.randomInt(1,MAX));
         
          
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
  this.rootPage=TabP2;
  this.isActived=2;
  document.getElementById('2').style.color="red";
}

change1(){
  this.rootPage=TabP1;
  this.isActived=1;
  document.getElementById('2').style.fontSize="#f4f4f4";
}

}


//------------------------------

@Component({
  selector:'tabp1',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class TabP1 {

  map: GoogleMap;
  pharmaciesLon=[];
  pharmaciesL=[];
  pharmacies=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: PharmaciesPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.pharmaciesL=this.h.latpharmacies;
    this.pharmaciesLon=this.h.lonpharmacies;
    this.pointReference=this.h.pointReference;
    this.pharmacies=this.h.pharmacies;
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

    let ionic: LatLng = new LatLng(this.pharmaciesL[0], this.pharmaciesLon[0]);

    for(var i=0; i<this.pharmacies.length; i++){
         ionic = new LatLng(this.pharmaciesL[i], this.pharmaciesLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.pharmacies[i],
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
  selector:'tabp2',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class TabP2 { 

 map: GoogleMap;
  pharmaciesLon=[];
  pharmaciesL=[];
  pharmacies=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: PharmaciesPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.pharmaciesL=this.h.latpharmacies;
    this.pharmaciesLon=this.h.lonpharmacies;
    this.pointReference=this.h.pointReference;
    this.pharmacies=this.h.pharmacies;
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

    let ionic: LatLng = new LatLng(this.pharmaciesL[0], this.pharmaciesLon[0]);

    for(var i=0; i<this.pharmacies.length; i++){
         ionic = new LatLng(this.pharmaciesL[i], this.pharmaciesLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.pharmacies[i],
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
    ionic=new LatLng(this.pharmaciesL[0], this.pharmaciesLon[0]);
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

