
import { HopitauxPage } from '../hopitaux/hopitaux';
import { Component, Injectable, Inject, NgZone } from '@angular/core';
import { NavController, Platform, ModalController, AlertController,ViewController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker, GoogleMapsAnimation, MapType, GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapContentPage {

 
  map: GoogleMap;
  hopitauxLon=[];
  hopitauxL=[];
  hopitaux=[];
  pointReference=[];
  private h: HopitauxPage;
  constructor( private alertCtrl:AlertController, public viewCtrl: ViewController) { 
    this.h.createDatabaseFile();
    this.hopitauxL=this.h.latHopitaux;
    this.hopitauxLon=this.h.lonHopitaux;
    this.pointReference=this.h.pointReference;
    this.hopitaux=this.h.hopitaux;
  }

  ionViewDidLoad() {
    this.h.createDatabaseFile();
    this.loadMap();
  }

  loadMap() {

    // Create a map after the view is ready and the native platform is ready.


    let options: GoogleMapOptions = {
    }

    this.map = GoogleMaps.create('map_canvas', options);

    let ionic: LatLng = new LatLng(this.hopitauxL[0], this.hopitauxLon[0]);

    for(var i=0; i<this.hopitaux.length; i++){
        let ionic = new LatLng(this.hopitauxL[i], this.hopitauxLon[i]);
               
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


        this.map.animateCamera({
          target:ionic,
          zoom:10,
          tilt:30
          }).then(()=>{
             

          });

            // create CameraPosition
        let position: CameraPosition<any> = {
          target: ionic,
          zoom: 10,
          tilt: 30
        };

        // move the map's camera to position
        this.map.moveCamera(position);
    // No longer wait GoogleMapsEvent.MAP_READY event
    // ( except you use map.getVisibleRegion() )
  }


  dismiss(){
  this.viewCtrl.dismiss();
  }

  onMapReady() {
    console.log('map is ready!');
  }
}