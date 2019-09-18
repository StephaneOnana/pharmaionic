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
  selector: 'page-autres',
  templateUrl: 'autres.html'
})
@Injectable()
export class AutresPage {
  pet:string="puppies";
  isAndroid:boolean=false;
  rootPage:any=TabA1;
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
  public autres=[];
  public divers=[];
  public autresPhotos=[];

  public dimunitifautres=[];
    public lonautres=[];
    public pointReferencesautres=[];
    public comautres=[];

    public latautres=[];
    public coordautres=[];
    public pointReference=[];
    public types=[];

     public autresAP=[];
     public dimunitifautresAP=[];
     public latautresAP=[];
     public lonautresAP=[];
     public pointReferenceAP=[];
     public autresPhotosAP=[];
     public comautresAP=[];
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
        this.putDatas();
        this.getDatasProximite();
        //this.updateTables();
      })
      .catch(e => console.log(e));

  }

  public createTables():void {

  this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
      
    }).catch(e=>console.log(e));
    
  }
  

  public putDatas():void{
    this.db.executeSql('DELETE FROM `DIVERS`', {}).then(()=>{
      
    }).catch(e=>console.log(e));

      this.autres=[];
      this.dimunitifautres=[];
      this.coordautres=[];
      this.pointReference=[];
      this.comautres=[];
      this.latautres=[];
      this.lonautres=[];
      this.types=[];
      this.dataservice.getDatas().subscribe(data=>{this.autres=data.autres;this.dimunitifautres=data.dimunitifAutres;this.coordautres=data.coordAutres;this.pointReference=data.pointReferencesAutres;this.comautres=data.commentairesAutres;this.types=data.typesAutres;
     for(var i=0; i<data.autres.length; i++){
       

        this.db.executeSql(' INSERT INTO `DIVERS` (nom,diminutif, latitude, longitude, pointReference, commentaires, type) VALUES(\'' + this.autres[i] + '\',\'' + this.dimunitifautres[i] + '\', '+ this.coordautres[i][0] +','+ this.coordautres[i][1] +',\'' + this.pointReference[i] + '\',\'' + this.comautres[i] + '\',\'' + this.types[i] + '\')', {}).then(()=>{
      
    }).catch(e=>console.log(e));
        
     }
     });
     
  }

  public getDatas():void{

      this.autres=[];
      this.dimunitifautres=[];
      this.coordautres=[];
      this.pointReference=[];
      this.comautres=[];
      this.latautres=[];
      this.lonautres=[];
      this.autresPhotos=[];
     
     this.autresAP=[];
     this.dimunitifautresAP=[];
     this.latautresAP=[];
     this.lonautresAP=[];
     this.pointReferenceAP=[];
     this.autresPhotosAP=[];


      this.db.executeSql('SELECT * FROM `DIVERS`', {}).then((data)=>{

        if(data==null){
          return ;
        }
        if(data.rows){
          if(data.rows.length>0){
            for(var i=0;i<data.rows.length;i++){
                  this.autres.push(data.rows.item(i).nom);
                  this.dimunitifautres.push(data.rows.item(i).diminutif);
                  this.latautres.push(data.rows.item(i).latitude);
                  this.lonautres.push(data.rows.item(i).longitude);
                  this.pointReference.push(data.rows.item(i).pointReference);
                  this.comautres.push(data.rows.item(i).commentaires);
                  this.autresPhotos.push("D"+this.randomInt(1,MAX));
            }
          }
        }
      
    }).catch(e=>console.log(e));

  }

 
  public getDatasProximite():void{
     
     this.autresAP=[];
     this.dimunitifautresAP=[];
     this.latautresAP=[];
     this.lonautresAP=[];
     this.pointReferenceAP=[];
     this.autresPhotosAP=[];
      
      this.autres=[];
      this.dimunitifautres=[];
      this.coordautres=[];
      this.pointReference=[];
      this.comautres=[];
      this.latautres=[];
      this.lonautres=[];
      this.autresPhotos=[];

     this.getDatas();

     LocationService.getMyLocation().then((myLocation: MyLocation) => {

      let position=myLocation.latLng;
      let connexion=this.dataservice.getStatusOfConnexion();
      this.alertCtrl.create({
        title:'Statut de la connexion:'+connexion+'',
        buttons:['OK']
      })
      for(var i=0;i<this.autres.length;i++){
          let locationB:ILatLng={
            lat:this.latautres[i],
            lng:this.lonautres[i]
          };
          let distance=Spherical.computeDistanceBetween(myLocation.latLng, locationB);
          if(distance<=DISTANCE){
            this.autresAP.push(this.autres[i]);
            this.dimunitifautresAP.push(this.dimunitifautres[i]);
            this.latautresAP.push(this.latautres[i]);
            this.lonautresAP.push(this.lonautres[i]);
            this.pointReferenceAP.push(this.pointReference[i]);
            this.comautresAP.push(this.comautres[i]);
            this.autresPhotosAP.push("D"+this.randomInt(1,MAX));
          }
          
         
          
    }  

    });
    

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
  this.rootPage=TabA2;
  this.isActived=2;
  document.getElementById('2').style.color="red";
}

change1(){
  this.rootPage=TabA1;
  this.isActived=1;
  document.getElementById('2').style.fontSize="#f4f4f4";
}

}


//------------------------------

@Component({
  selector:'taba1',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class TabA1 {

  map: GoogleMap;
  autresLon=[];
  autresL=[];
  autres=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: AutresPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.autresL=this.h.latautres;
    this.autresLon=this.h.lonautres;
    this.pointReference=this.h.pointReference;
    this.autres=this.h.autres;
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

    let ionic: LatLng = new LatLng(this.autresL[0], this.autresLon[0]);

    for(var i=0; i<this.autres.length; i++){
         ionic = new LatLng(this.autresL[i], this.autresLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.autres[i],
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
  selector:'taba2',
  template: `
    <div id="map_canvas">
    
  </div>
  `
})
export class TabA2 { 

 map: GoogleMap;
  autresLon=[];
  autresL=[];
  autres=[];
  pointReference=[];
  public maPosition:any;
  constructor(private h: AutresPage, private alertCtrl:AlertController, public geoLocation: Geolocation) { 
    this.h.createDatabaseFile();
    this.autresL=this.h.latautres;
    this.autresLon=this.h.lonautres;
    this.pointReference=this.h.pointReference;
    this.autres=this.h.autres;
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

    let ionic: LatLng = new LatLng(this.autresL[0], this.autresLon[0]);

    for(var i=0; i<this.autres.length; i++){
         ionic = new LatLng(this.autresL[i], this.autresLon[i]);
               
        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: ''+this.autres[i],
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
    ionic=new LatLng(this.autresL[0], this.autresLon[0]);
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

