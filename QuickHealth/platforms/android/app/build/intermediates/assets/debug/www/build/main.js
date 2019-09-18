webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HopitauxPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Tab1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Tab2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DATABASE_FILENAME = 'quickhealth.db';
var ID_JSON = "9934d7c8ee514aa58544a43691e2acf9";
var MAX = 13;
var DISTANCE = 1000;
var HopitauxPage = /** @class */ (function () {
    //***********************
    function HopitauxPage(navCtrl, platform, modalCtrl, sqlite, alertCtrl, http, dataservice, viewCtrl, zone, spherical, geoLocation) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.dataservice = dataservice;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.spherical = spherical;
        this.geoLocation = geoLocation;
        this.pet = "puppies";
        this.isAndroid = false;
        this.rootPage = Tab1;
        this.isActived = 1;
        this.selectedItem = {
            nom: "Mohammad"
        };
        this.donnee = [];
        this.pharmacies = [];
        this.hopitaux = [];
        this.divers = [];
        this.hopitauxPhotos = [];
        this.dimunitifPharmacies = [];
        this.latPharmacies = [];
        this.lonPharmacies = [];
        this.pointReferencesPharmacies = [];
        this.comPharmacies = [];
        this.dimunitifHopitaux = [];
        this.latHopitaux = [];
        this.lonHopitaux = [];
        this.pointReferencesHopitaux = [];
        this.comHopitaux = [];
        this.coordHopitaux = [];
        this.pointReference = [];
        this.hopitauxAP = [];
        this.dimunitifHopitauxAP = [];
        this.latHopitauxAP = [];
        this.lonHopitauxAP = [];
        this.pointReferenceAP = [];
        this.hopitauxPhotosAP = [];
        this.comHopitauxAP = [];
        this.latDivers = [];
        this.lonDivers = [];
        this.pointReferencesDivers = [];
        this.comDivers = [];
        this.typesDivers = [];
        this.dimunitifDivers = [];
        this.isAndroid = platform.is('android');
        this.createDatabaseFile();
    }
    HopitauxPage.prototype.createDatabaseFile = function () {
        var _this = this;
        this.sqlite = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]();
        this.sqlite.create({
            name: DATABASE_FILENAME,
            location: 'default'
        })
            .then(function (db) {
            _this.db = db;
            _this.createTables();
            //this.putDatas();
            _this.getDatasProximite();
            //this.updateTables();
        })
            .catch(function (e) { return console.log(e); });
    };
    HopitauxPage.prototype.createTables = function () {
        /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `PHARMACIES` (`idPharmacie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL ,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{
          
        }).catch(e=>console.log(e));
        */
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `HOPITAUX` (`idHopital` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
        /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
          
        }).catch(e=>console.log(e));
        */
    };
    HopitauxPage.prototype.putDatas = function () {
        var _this = this;
        this.db.executeSql('DELETE FROM `HOPITAUX`', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
        this.hopitaux = [];
        this.dimunitifHopitaux = [];
        this.coordHopitaux = [];
        this.pointReference = [];
        this.comHopitaux = [];
        this.latHopitaux = [];
        this.lonHopitaux = [];
        this.dataservice.getDatas().subscribe(function (data) {
            _this.hopitaux = data.hopitaux;
            _this.dimunitifHopitaux = data.dimunitifsHopitaux;
            _this.coordHopitaux = data.coordHopitaux;
            _this.pointReference = data.pointReferencesHopitaux;
            _this.comHopitaux = data.commentairesHopitaux;
            for (var i = 0; i < data.hopitaux.length; i++) {
                _this.db.executeSql(' INSERT INTO `HOPITAUX` (nom,diminutif, latitude, longitude, pointReference, commentaires) VALUES(\'' + _this.hopitaux[i] + '\',\'' + _this.dimunitifHopitaux[i] + '\', ' + _this.coordHopitaux[i][0] + ',' + _this.coordHopitaux[i][1] + ',\'' + _this.pointReference[i] + '\',\'' + _this.comHopitaux[i] + '\')', {}).then(function () {
                }).catch(function (e) { return console.log(e); });
            }
        });
    };
    HopitauxPage.prototype.getDatas = function () {
        var _this = this;
        this.hopitaux = [];
        this.dimunitifHopitaux = [];
        this.coordHopitaux = [];
        this.pointReference = [];
        this.comHopitaux = [];
        this.latHopitaux = [];
        this.lonHopitaux = [];
        this.hopitauxPhotos = [];
        this.hopitauxAP = [];
        this.dimunitifHopitauxAP = [];
        this.latHopitauxAP = [];
        this.lonHopitauxAP = [];
        this.pointReferenceAP = [];
        this.hopitauxPhotosAP = [];
        this.db.executeSql('SELECT * FROM `HOPITAUX`', {}).then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.hopitaux.push(data.rows.item(i).nom);
                        _this.dimunitifHopitaux.push(data.rows.item(i).diminutif);
                        _this.latHopitaux.push(data.rows.item(i).latitude);
                        _this.lonHopitaux.push(data.rows.item(i).longitude);
                        _this.pointReference.push(data.rows.item(i).pointReference);
                        _this.comHopitaux.push(data.rows.item(i).commentaires);
                        _this.hopitauxPhotos.push("H" + _this.randomInt(1, MAX));
                    }
                }
            }
        }).catch(function (e) { return console.log(e); });
    };
    HopitauxPage.prototype.getDatasProximite = function () {
        this.hopitauxAP = [];
        this.dimunitifHopitauxAP = [];
        this.latHopitauxAP = [];
        this.lonHopitauxAP = [];
        this.pointReferenceAP = [];
        this.hopitauxPhotosAP = [];
        this.hopitaux = [];
        this.dimunitifHopitaux = [];
        this.coordHopitaux = [];
        this.pointReference = [];
        this.comHopitaux = [];
        this.latHopitaux = [];
        this.lonHopitaux = [];
        this.hopitauxPhotos = [];
        this.getDatas();
        for (var i = 0; i < this.hopitaux.length; i++) {
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
            this.hopitauxPhotosAP.push("H" + this.randomInt(1, MAX));
            // }
        }
    };
    HopitauxPage.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    HopitauxPage.prototype.openMap = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__maps_maps__["a" /* MapContentPage */]);
        modal.present();
    };
    HopitauxPage.prototype.changeGlobal = function () {
        ///document.getElementById('btn1').style.color="red"; 
    };
    HopitauxPage.prototype.change = function () {
        //this.zone.run(()=>{this.navCtrl.setRoot(TabsPage);})
        this.rootPage = Tab2;
        this.isActived = 2;
        document.getElementById('2').style.color = "red";
    };
    HopitauxPage.prototype.change1 = function () {
        this.rootPage = Tab1;
        this.isActived = 1;
        document.getElementById('2').style.fontSize = "#f4f4f4";
    };
    HopitauxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-hopitaux',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\hopitaux\hopitaux.html"*/'<ion-header class="header header-md" color="teal">\n  <ion-navbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-bottom="">\n\n\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="button-effect"></div>\n\n    <ion-title class="title title-md">\n      <div class="toolbar-title toolbar-title-md">\n        Hopitaux\n      </div>\n    </ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-top="">\n    <div class="toolbar-background toolbar-background-md"></div>\n    <div class="toolbar-content toolbar-content-md">\n      <ion-segment class="segment segment-md ng-valid ng-touched ng-dirty" [(ngModel)]="pet">\n        <ion-segment-button class="segment-button segment-activated" role="button" tappable="" value="puppies" aria-pressed="true">\n          A proximité\n          <div class="button-effect" style="transform: translate3d(-6px, -55px, 0px) scale(1); height: 172px; width: 172px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n        </ion-segment-button>\n        <ion-segment-button class="segment-button" role="button" tappable="" value="kittens" aria-pressed="false">\n          Tous\n          <div class="button-effect" style="transform: translate3d(-77px, -74px, 0px) scale(1); height: 198px; width: 198px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n        </ion-segment-button>\n        <ion-segment-button class="segment-button" role="button" tappable="" value="ducklings" aria-pressed="false" (click)="changeGlobal()">\n          Positions\n          <div class="button-effect"></div>\n          \n        </ion-segment-button>\n\n      </ion-segment>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div padding>\n    <div [ngSwitch]="pet">\n      <div *ngSwitchCase="\'puppies\'">\n        <h2>Les hopitaux à proximité:</h2>\n        <ion-card *ngFor="let h of hopitaux; index as i" class="adv-map">\n          <div style="position: relative;">\n            <img src="../../assets/imgs/{{hopitauxPhotos[i]}}.JPG">\n          \n          <ion-fab right top>\n            <button ion-fab color="teal" class="fab-map">\n              {{dimunitifHopitauxAP[i]}}\n            </button>\n          </ion-fab >\n          <ion-item>\n           \n            <h2>{{h}}</h2>\n            <p>{{pointReferenceAP[i]}}</p>\n          </ion-item>\n          </div>\n          <ion-card-content>\n            <p>{{comHopitauxAP[i]}}</p>\n          </ion-card-content>\n          <ion-row>\n            <ion-col>\n              <button ion-button icon-start clear small color="teal">\n                <ion-icon name="pin"></ion-icon>\n                <div >Position: {{latHopitauxAP[i]}}  ,  {{lonHopitauxAP[i]}}</div>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n\n\n      <div *ngSwitchCase="\'kittens\'">\n        <h2>Tous les hopitaux</h2>\n        <ion-card *ngFor="let h of hopitaux; index as i" class="adv-map">\n          <div style="position: relative;">\n            <img src="../../assets/imgs/{{hopitauxPhotos[i]}}.JPG">\n          \n          <ion-fab right top>\n            <button ion-fab color="teal" class="fab-map">\n              {{dimunitifHopitaux[i]}}\n            </button>\n          </ion-fab >\n          <ion-item>\n           \n            <h2>{{h}}</h2>\n            <p>{{pointReference[i]}}</p>\n          </ion-item>\n          </div>\n          <ion-card-content>\n            <p>{{comHopitaux[i]}}</p>\n          </ion-card-content>\n          <ion-row>\n            <ion-col>\n              <button ion-button icon-start clear small color="teal">\n                <ion-icon name="pin"></ion-icon>\n                <div >Position: {{latHopitaux[i]}}  ,  {{lonHopitaux[i]}}</div>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n\n      </div>\n      <div *ngSwitchCase="\'ducklings\'">\n        <!--h2>Maps not available yet</h2>\n        <ion-fab right bottom>\n          <button ion-fab color="teal" (click)="openMap(\n            {\n              donnees:[selectedItem]\n            }\n          )">\n              <ion-icon name="pin"></ion-icon>\n          </button>\n          \n        </ion-fab-->\n        <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n        <ion-footer>\n  <ion-toolbar color="teal">\n     <ion-row no-padding text-center >\n      <ion-col>\n        <button ion-button clear small color="light" icon-start (click)="change1()" id="btn1">\n          <ion-icon name=\'pin\'></ion-icon>\n          A proximité\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="light" icon-start (click)="change()" id="2">\n          <ion-icon name=\'locate\'></ion-icon>\n          Tous\n        </button>\n      </ion-col>\n</ion-row>\n  </ion-toolbar>\n</ion-footer>\n  </div>\n      </div>\n    </div>\n   \n\n</ion-content>'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\hopitaux\hopitaux.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__["a" /* DataServices */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["e" /* Spherical */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], HopitauxPage);
    return HopitauxPage;
}());

//------------------------------
var Tab1 = /** @class */ (function () {
    function Tab1(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.hopitauxLon = [];
        this.hopitauxL = [];
        this.hopitaux = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.hopitauxL = this.h.latHopitaux;
        this.hopitauxLon = this.h.lonHopitaux;
        this.pointReference = this.h.pointReference;
        this.hopitaux = this.h.hopitaux;
        this.maPosition = this.h.maPosition;
    }
    Tab1.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    Tab1.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[0], this.hopitauxLon[0]);
        for (var i = 0; i < this.hopitaux.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[i], this.hopitauxLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.hopitaux[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        //let p = this.getMyLocation();
        //ionic=new LatLng(p.lat, p.lng);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
    };
    Tab1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tab1',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [HopitauxPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], Tab1);
    return Tab1;
}());

//*********************
var Tab2 = /** @class */ (function () {
    function Tab2(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.hopitauxLon = [];
        this.hopitauxL = [];
        this.hopitaux = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.hopitauxL = this.h.latHopitaux;
        this.hopitauxLon = this.h.lonHopitaux;
        this.pointReference = this.h.pointReference;
        this.hopitaux = this.h.hopitaux;
        this.maPosition = this.h.maPosition;
    }
    Tab2.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    Tab2.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[0], this.hopitauxLon[0]);
        for (var i = 0; i < this.hopitaux.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[i], this.hopitauxLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.hopitaux[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        /* let p=this.getMyLocation();
        ionic=new LatLng(p.lat, p.lng);*/
        ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[0], this.hopitauxLon[0]);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
        // move the map's camera to position
        //this.map.moveCamera(position);
        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    };
    Tab2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tab2',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [HopitauxPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], Tab2);
    return Tab2;
}());

//# sourceMappingURL=hopitaux.js.map

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dataservice__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, dataservice) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dataservice = dataservice;
        this.donnees = [];
        this.h = [];
        this.dataservice.getDatas().subscribe(function (data) { _this.donnees = data; _this.h = data.hopitaux; });
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="teal">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Acceuil</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="padding">\n    <ion-searchbar [(ngModel)]="myInput" [showCancelButton]="shouldShowCancel" (ionInput)="onInput($event)" (ionCancel)="onCancel($event)">\n    </ion-searchbar>\n  </div>\n\n <h3>\n   Bienvenue dans l\'application qui vous permet de gagner en temps sur les informations sanitaires de la ville de Maroua!\n </h3>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_dataservice__["a" /* DataServices */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutresPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TabA1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TabA2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DATABASE_FILENAME = 'quickhealth.db';
var ID_JSON = "9934d7c8ee514aa58544a43691e2acf9";
var MAX = 13;
var DISTANCE = 1000;
var AutresPage = /** @class */ (function () {
    //***********************
    function AutresPage(navCtrl, platform, modalCtrl, sqlite, alertCtrl, http, dataservice, viewCtrl, zone, spherical, geoLocation) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.dataservice = dataservice;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.spherical = spherical;
        this.geoLocation = geoLocation;
        this.pet = "puppies";
        this.isAndroid = false;
        this.rootPage = TabA1;
        this.isActived = 1;
        this.selectedItem = {
            nom: "Mohammad"
        };
        this.donnee = [];
        this.autres = [];
        this.divers = [];
        this.autresPhotos = [];
        this.dimunitifautres = [];
        this.lonautres = [];
        this.pointReferencesautres = [];
        this.comautres = [];
        this.latautres = [];
        this.coordautres = [];
        this.pointReference = [];
        this.types = [];
        this.autresAP = [];
        this.dimunitifautresAP = [];
        this.latautresAP = [];
        this.lonautresAP = [];
        this.pointReferenceAP = [];
        this.autresPhotosAP = [];
        this.comautresAP = [];
        this.latDivers = [];
        this.lonDivers = [];
        this.pointReferencesDivers = [];
        this.comDivers = [];
        this.typesDivers = [];
        this.dimunitifDivers = [];
        this.isAndroid = platform.is('android');
        this.createDatabaseFile();
    }
    AutresPage.prototype.createDatabaseFile = function () {
        var _this = this;
        this.sqlite = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]();
        this.sqlite.create({
            name: DATABASE_FILENAME,
            location: 'default'
        })
            .then(function (db) {
            _this.db = db;
            _this.createTables();
            _this.putDatas();
            _this.getDatasProximite();
            //this.updateTables();
        })
            .catch(function (e) { return console.log(e); });
    };
    AutresPage.prototype.createTables = function () {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
    };
    AutresPage.prototype.putDatas = function () {
        var _this = this;
        this.db.executeSql('DELETE FROM `DIVERS`', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
        this.autres = [];
        this.dimunitifautres = [];
        this.coordautres = [];
        this.pointReference = [];
        this.comautres = [];
        this.latautres = [];
        this.lonautres = [];
        this.types = [];
        this.dataservice.getDatas().subscribe(function (data) {
            _this.autres = data.autres;
            _this.dimunitifautres = data.dimunitifAutres;
            _this.coordautres = data.coordAutres;
            _this.pointReference = data.pointReferencesAutres;
            _this.comautres = data.commentairesAutres;
            _this.types = data.typesAutres;
            for (var i = 0; i < data.autres.length; i++) {
                _this.db.executeSql(' INSERT INTO `DIVERS` (nom,diminutif, latitude, longitude, pointReference, commentaires, type) VALUES(\'' + _this.autres[i] + '\',\'' + _this.dimunitifautres[i] + '\', ' + _this.coordautres[i][0] + ',' + _this.coordautres[i][1] + ',\'' + _this.pointReference[i] + '\',\'' + _this.comautres[i] + '\',\'' + _this.types[i] + '\')', {}).then(function () {
                }).catch(function (e) { return console.log(e); });
            }
        });
    };
    AutresPage.prototype.getDatas = function () {
        var _this = this;
        this.autres = [];
        this.dimunitifautres = [];
        this.coordautres = [];
        this.pointReference = [];
        this.comautres = [];
        this.latautres = [];
        this.lonautres = [];
        this.autresPhotos = [];
        this.autresAP = [];
        this.dimunitifautresAP = [];
        this.latautresAP = [];
        this.lonautresAP = [];
        this.pointReferenceAP = [];
        this.autresPhotosAP = [];
        this.db.executeSql('SELECT * FROM `DIVERS`', {}).then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.autres.push(data.rows.item(i).nom);
                        _this.dimunitifautres.push(data.rows.item(i).diminutif);
                        _this.latautres.push(data.rows.item(i).latitude);
                        _this.lonautres.push(data.rows.item(i).longitude);
                        _this.pointReference.push(data.rows.item(i).pointReference);
                        _this.comautres.push(data.rows.item(i).commentaires);
                        _this.autresPhotos.push("D" + _this.randomInt(1, MAX));
                    }
                }
            }
        }).catch(function (e) { return console.log(e); });
    };
    AutresPage.prototype.getDatasProximite = function () {
        var _this = this;
        this.autresAP = [];
        this.dimunitifautresAP = [];
        this.latautresAP = [];
        this.lonautresAP = [];
        this.pointReferenceAP = [];
        this.autresPhotosAP = [];
        this.autres = [];
        this.dimunitifautres = [];
        this.coordautres = [];
        this.pointReference = [];
        this.comautres = [];
        this.latautres = [];
        this.lonautres = [];
        this.autresPhotos = [];
        this.getDatas();
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["d" /* LocationService */].getMyLocation().then(function (myLocation) {
            var position = myLocation.latLng;
            for (var i = 0; i < _this.autres.length; i++) {
                var locationB = {
                    lat: _this.latautres[i],
                    lng: _this.lonautres[i]
                };
                var distance = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["e" /* Spherical */].computeDistanceBetween(myLocation.latLng, locationB);
                if (distance <= DISTANCE) {
                    _this.autresAP.push(_this.autres[i]);
                    _this.dimunitifautresAP.push(_this.dimunitifautres[i]);
                    _this.latautresAP.push(_this.latautres[i]);
                    _this.lonautresAP.push(_this.lonautres[i]);
                    _this.pointReferenceAP.push(_this.pointReference[i]);
                    _this.comautresAP.push(_this.comautres[i]);
                    _this.autresPhotosAP.push("D" + _this.randomInt(1, MAX));
                }
            }
        });
    };
    AutresPage.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    AutresPage.prototype.openMap = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__maps_maps__["a" /* MapContentPage */]);
        modal.present();
    };
    AutresPage.prototype.changeGlobal = function () {
        ///document.getElementById('btn1').style.color="red"; 
    };
    AutresPage.prototype.change = function () {
        //this.zone.run(()=>{this.navCtrl.setRoot(TabsPage);})
        this.rootPage = TabA2;
        this.isActived = 2;
        document.getElementById('2').style.color = "red";
    };
    AutresPage.prototype.change1 = function () {
        this.rootPage = TabA1;
        this.isActived = 1;
        document.getElementById('2').style.fontSize = "#f4f4f4";
    };
    AutresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-autres',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\autres\autres.html"*/'<ion-header class="header header-md" color="teal">\n\n  <ion-navbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-bottom="">\n\n\n\n\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <div class="button-effect"></div>\n\n\n\n    <ion-title class="title title-md">\n\n      <div class="toolbar-title toolbar-title-md">\n\n        Autres infrastructures\n\n      </div>\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-top="">\n\n    <div class="toolbar-background toolbar-background-md"></div>\n\n    <div class="toolbar-content toolbar-content-md">\n\n      <ion-segment class="segment segment-md ng-valid ng-touched ng-dirty" [(ngModel)]="pet">\n\n        <ion-segment-button class="segment-button segment-activated" role="button" tappable="" value="puppies" aria-pressed="true" (click)="getDatasProximite()">\n\n         A proximité\n\n          <div class="button-effect" style="transform: translate3d(-6px, -55px, 0px) scale(1); height: 172px; width: 172px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n\n        </ion-segment-button>\n\n        <ion-segment-button class="segment-button" role="button" tappable="" value="kittens" aria-pressed="false">\n\n          Toutes\n\n          <div class="button-effect" style="transform: translate3d(-77px, -74px, 0px) scale(1); height: 198px; width: 198px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n\n        </ion-segment-button>\n\n        <ion-segment-button class="segment-button" role="button" tappable="" value="ducklings" aria-pressed="false" (click)="changeGlobal()">\n\n          Positions\n\n          <div class="button-effect"></div>\n\n          \n\n        </ion-segment-button>\n\n\n\n      </ion-segment>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div padding>\n\n    <div [ngSwitch]="pet">\n\n      <div *ngSwitchCase="\'puppies\'">\n\n        <h2>Les autres infrastructures sanitaires à proximité</h2>\n\n        <ion-card *ngFor="let h of autresAP; index as i" class="adv-map">\n\n          <div style="position: relative;">\n\n            <img src="../../assets/imgs/{{autresPhotos[i]}}.JPG">\n\n          \n\n          <ion-fab right top>\n\n            <button ion-fab color="teal" class="fab-map">\n\n              {{dimunitifautresAP[i]}}\n\n            </button>\n\n          </ion-fab >\n\n          <ion-item>\n\n           \n\n            <h2>{{h}}</h2>\n\n            <p>{{pointReferenceAP[i]}}</p>\n\n          </ion-item>\n\n          </div>\n\n          <ion-card-content>\n\n            <p>{{comautresAP[i]}}</p>\n\n          </ion-card-content>\n\n          <ion-row>\n\n            <ion-col>\n\n              <button ion-button icon-start clear small color="teal">\n\n                <ion-icon name="pin"></ion-icon>\n\n                <div >Position: {{latautresAP[i]}}  ,  {{lonautresAP[i]}}</div>\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-card>\n\n      </div>\n\n\n\n\n\n      <div *ngSwitchCase="\'kittens\'">\n\n        <h2>Toutes les autres</h2>\n\n        <ion-card *ngFor="let h of autres; index as i" class="adv-map">\n\n          <div style="position: relative;">\n\n            <img src="../../assets/imgs/{{autresPhotos[i]}}.JPG">\n\n          \n\n          <ion-fab right top>\n\n            <button ion-fab color="teal" class="fab-map">\n\n              {{dimunitifautres[i]}}\n\n            </button>\n\n          </ion-fab >\n\n          <ion-item>\n\n           \n\n            <h2>{{h}}</h2>\n\n            <p>{{pointReference[i]}}</p>\n\n          </ion-item>\n\n          </div>\n\n          <ion-card-content>\n\n            <p>{{comautres[i]}}</p>\n\n          </ion-card-content>\n\n          <ion-row>\n\n            <ion-col>\n\n              <button ion-button icon-start clear small color="teal">\n\n                <ion-icon name="pin"></ion-icon>\n\n                <div>Position: {{latautres[i]}}  ,  {{lonautres[i]}}</div>\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-card>\n\n\n\n      </div>\n\n      <div *ngSwitchCase="\'ducklings\'">\n\n        <!--h2>Maps not available yet</h2>\n\n        <ion-fab right bottom>\n\n          <button ion-fab color="teal" (click)="openMap(\n\n            {\n\n              donnees:[selectedItem]\n\n            }\n\n          )">\n\n              <ion-icon name="pin"></ion-icon>\n\n          </button>\n\n          \n\n        </ion-fab-->\n\n        <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n        <ion-footer>\n\n  <ion-toolbar color="teal">\n\n     <ion-row no-padding text-center >\n\n      <ion-col>\n\n        <button ion-button clear small color="light" icon-start (click)="change1()" id="btn1">\n\n          <ion-icon name=\'pin\'></ion-icon>\n\n          A proximité\n\n        </button>\n\n      </ion-col>\n\n      <ion-col text-center>\n\n        <button ion-button clear small color="light" icon-start (click)="change()" id="2">\n\n          <ion-icon name=\'locate\'></ion-icon>\n\n          Toutes\n\n        </button>\n\n      </ion-col>\n\n</ion-row>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n  </div>\n\n      </div>\n\n    </div>\n\n   \n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\autres\autres.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__["a" /* DataServices */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["e" /* Spherical */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], AutresPage);
    return AutresPage;
}());

//------------------------------
var TabA1 = /** @class */ (function () {
    function TabA1(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.autresLon = [];
        this.autresL = [];
        this.autres = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.autresL = this.h.latautres;
        this.autresLon = this.h.lonautres;
        this.pointReference = this.h.pointReference;
        this.autres = this.h.autres;
        this.maPosition = this.h.maPosition;
    }
    TabA1.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    TabA1.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.autresL[0], this.autresLon[0]);
        for (var i = 0; i < this.autres.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.autresL[i], this.autresLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.autres[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        //let p = this.getMyLocation();
        //ionic=new LatLng(p.lat, p.lng);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
    };
    TabA1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'taba1',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [AutresPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], TabA1);
    return TabA1;
}());

//*********************
var TabA2 = /** @class */ (function () {
    function TabA2(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.autresLon = [];
        this.autresL = [];
        this.autres = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.autresL = this.h.latautres;
        this.autresLon = this.h.lonautres;
        this.pointReference = this.h.pointReference;
        this.autres = this.h.autres;
        this.maPosition = this.h.maPosition;
    }
    TabA2.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    TabA2.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.autresL[0], this.autresLon[0]);
        for (var i = 0; i < this.autres.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.autresL[i], this.autresLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.autres[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        /* let p=this.getMyLocation();
        ionic=new LatLng(p.lat, p.lng);*/
        ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.autresL[0], this.autresLon[0]);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
        // move the map's camera to position
        //this.map.moveCamera(position);
        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    };
    TabA2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'taba2',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [AutresPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], TabA2);
    return TabA2;
}());

//# sourceMappingURL=autres.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PharmaciesPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TabP1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TabP2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DATABASE_FILENAME = 'quickhealth.db';
var ID_JSON = "9934d7c8ee514aa58544a43691e2acf9";
var MAX = 13;
var DISTANCE = 1000;
var PharmaciesPage = /** @class */ (function () {
    //***********************
    function PharmaciesPage(navCtrl, platform, modalCtrl, sqlite, alertCtrl, http, dataservice, viewCtrl, zone, spherical, geoLocation) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.dataservice = dataservice;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.spherical = spherical;
        this.geoLocation = geoLocation;
        this.pet = "puppies";
        this.isAndroid = false;
        this.rootPage = TabP1;
        this.isActived = 1;
        this.selectedItem = {
            nom: "Mohammad"
        };
        this.donnee = [];
        this.pharmacies = [];
        this.divers = [];
        this.pharmaciesPhotos = [];
        this.dimunitifPharmacies = [];
        this.latPharmacies = [];
        this.lonPharmacies = [];
        this.pointReferencesPharmacies = [];
        this.compharmacies = [];
        this.dimunitifpharmacies = [];
        this.latpharmacies = [];
        this.lonpharmacies = [];
        this.pointReferencespharmacies = [];
        this.coordpharmacies = [];
        this.pointReference = [];
        this.pharmaciesAP = [];
        this.dimunitifpharmaciesAP = [];
        this.latpharmaciesAP = [];
        this.lonpharmaciesAP = [];
        this.pointReferenceAP = [];
        this.pharmaciesPhotosAP = [];
        this.compharmaciesAP = [];
        this.latDivers = [];
        this.lonDivers = [];
        this.pointReferencesDivers = [];
        this.comDivers = [];
        this.typesDivers = [];
        this.dimunitifDivers = [];
        this.isAndroid = platform.is('android');
        this.createDatabaseFile();
    }
    PharmaciesPage.prototype.createDatabaseFile = function () {
        var _this = this;
        this.sqlite = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]();
        this.sqlite.create({
            name: DATABASE_FILENAME,
            location: 'default'
        })
            .then(function (db) {
            _this.db = db;
            _this.createTables();
            //this.putDatas();
            _this.getDatasProximite();
            //this.updateTables();
        })
            .catch(function (e) { return console.log(e); });
    };
    PharmaciesPage.prototype.createTables = function () {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `PHARMACIES` (`idPharmacie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL ,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
        /*this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
          
        }).catch(e=>console.log(e));
        */
    };
    PharmaciesPage.prototype.putDatas = function () {
        var _this = this;
        this.db.executeSql('DELETE FROM `PHARMACIES`', {}).then(function () {
        }).catch(function (e) { return console.log(e); });
        this.pharmacies = [];
        this.dimunitifpharmacies = [];
        this.coordpharmacies = [];
        this.pointReference = [];
        this.compharmacies = [];
        this.latpharmacies = [];
        this.lonpharmacies = [];
        this.dataservice.getDatas().subscribe(function (data) {
            _this.pharmacies = data.pharmacies;
            _this.dimunitifpharmacies = data.dimunitifsPharmacies;
            _this.coordpharmacies = data.coordPharmacies;
            _this.pointReference = data.pointReferencesPharmacies;
            _this.compharmacies = data.commentairesPharmacies;
            for (var i = 0; i < data.pharmacies.length; i++) {
                _this.db.executeSql(' INSERT INTO `PHARMACIES` (nom,diminutif, latitude, longitude, pointReference, commentaires) VALUES(\'' + _this.pharmacies[i] + '\',\'' + _this.dimunitifpharmacies[i] + '\', ' + _this.coordpharmacies[i][0] + ',' + _this.coordpharmacies[i][1] + ',\'' + _this.pointReference[i] + '\',\'' + _this.compharmacies[i] + '\')', {}).then(function () {
                }).catch(function (e) { return console.log(e); });
            }
        });
    };
    PharmaciesPage.prototype.getDatas = function () {
        var _this = this;
        this.pharmacies = [];
        this.dimunitifpharmacies = [];
        this.coordpharmacies = [];
        this.pointReference = [];
        this.compharmacies = [];
        this.latpharmacies = [];
        this.lonpharmacies = [];
        this.pharmaciesPhotos = [];
        this.pharmaciesAP = [];
        this.dimunitifpharmaciesAP = [];
        this.latpharmaciesAP = [];
        this.lonpharmaciesAP = [];
        this.pointReferenceAP = [];
        this.pharmaciesPhotosAP = [];
        this.db.executeSql('SELECT * FROM `PHARMACIES`', {}).then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.pharmacies.push(data.rows.item(i).nom);
                        _this.dimunitifpharmacies.push(data.rows.item(i).diminutif);
                        _this.latpharmacies.push(data.rows.item(i).latitude);
                        _this.lonpharmacies.push(data.rows.item(i).longitude);
                        _this.pointReference.push(data.rows.item(i).pointReference);
                        _this.compharmacies.push(data.rows.item(i).commentaires);
                        _this.pharmaciesPhotos.push("P" + _this.randomInt(1, MAX));
                    }
                }
            }
        }).catch(function (e) { return console.log(e); });
    };
    PharmaciesPage.prototype.getDatasProximite = function () {
        this.pharmaciesAP = [];
        this.dimunitifpharmaciesAP = [];
        this.latpharmaciesAP = [];
        this.lonpharmaciesAP = [];
        this.pointReferenceAP = [];
        this.pharmaciesPhotosAP = [];
        this.pharmacies = [];
        this.dimunitifpharmacies = [];
        this.coordpharmacies = [];
        this.pointReference = [];
        this.compharmacies = [];
        this.latpharmacies = [];
        this.lonpharmacies = [];
        this.pharmaciesPhotos = [];
        this.getDatas();
        for (var i = 0; i < this.pharmacies.length; i++) {
            this.pharmaciesAP.push(this.pharmacies[i]);
            this.dimunitifpharmaciesAP.push(this.dimunitifpharmacies[i]);
            this.latpharmaciesAP.push(this.latpharmacies[i]);
            this.lonpharmaciesAP.push(this.lonpharmacies[i]);
            this.pointReferenceAP.push(this.pointReference[i]);
            this.compharmaciesAP.push(this.compharmacies[i]);
            this.pharmaciesPhotosAP.push("H" + this.randomInt(1, MAX));
        }
    };
    PharmaciesPage.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    PharmaciesPage.prototype.openMap = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__maps_maps__["a" /* MapContentPage */]);
        modal.present();
    };
    PharmaciesPage.prototype.changeGlobal = function () {
        ///document.getElementById('btn1').style.color="red"; 
    };
    PharmaciesPage.prototype.change = function () {
        //this.zone.run(()=>{this.navCtrl.setRoot(TabsPage);})
        this.rootPage = TabP2;
        this.isActived = 2;
        document.getElementById('2').style.color = "red";
    };
    PharmaciesPage.prototype.change1 = function () {
        this.rootPage = TabP1;
        this.isActived = 1;
        document.getElementById('2').style.fontSize = "#f4f4f4";
    };
    PharmaciesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pharmacies',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\pharmacies\pharmacies.html"*/'<ion-header class="header header-md" color="teal">\n  <ion-navbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-bottom="">\n\n\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="button-effect"></div>\n\n    <ion-title class="title title-md">\n      <div class="toolbar-title toolbar-title-md">\n        Pharmacies\n      </div>\n    </ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="teal" class="toolbar toolbar-md statusbar-padding" no-border-top="">\n    <div class="toolbar-background toolbar-background-md"></div>\n    <div class="toolbar-content toolbar-content-md">\n      <ion-segment class="segment segment-md ng-valid ng-touched ng-dirty" [(ngModel)]="pet">\n        <ion-segment-button class="segment-button segment-activated" role="button" tappable="" value="puppies" aria-pressed="true" (click)="getDatasProximite()">\n          De Garde\n          <div class="button-effect" style="transform: translate3d(-6px, -55px, 0px) scale(1); height: 172px; width: 172px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n        </ion-segment-button>\n        <ion-segment-button class="segment-button" role="button" tappable="" value="kittens" aria-pressed="false">\n          Toutes\n          <div class="button-effect" style="transform: translate3d(-77px, -74px, 0px) scale(1); height: 198px; width: 198px; opacity: 0; transition: transform 329ms ease 0s, opacity 230ms ease 99ms;"></div>\n        </ion-segment-button>\n        <ion-segment-button class="segment-button" role="button" tappable="" value="ducklings" aria-pressed="false" (click)="changeGlobal()">\n          Positions\n          <div class="button-effect"></div>\n          \n        </ion-segment-button>\n\n      </ion-segment>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div padding>\n    <div [ngSwitch]="pet">\n      <div *ngSwitchCase="\'puppies\'">\n        <h2>Les pharmacies de garde</h2>\n        <ion-card *ngFor="let h of pharmacies; index as i" class="adv-map">\n          <div style="position: relative;">\n            <img src="../../assets/imgs/{{pharmaciesPhotos[i]}}.JPG">\n          \n          <ion-fab right top>\n            <button ion-fab color="teal" class="fab-map">\n              {{dimunitifpharmacies[i]}}\n            </button>\n          </ion-fab >\n          <ion-item>\n           \n            <h2>OK</h2>\n            <p>{{pointReference[i]}}</p>\n          </ion-item>\n          </div>\n          <ion-card-content>\n            <p>{{compharmacies[i]}}</p>\n          </ion-card-content>\n          <ion-row>\n            <ion-col>\n              <button ion-button icon-start clear small color="teal">\n                <ion-icon name="pin"></ion-icon>\n                <div >Position: {{latpharmacies[i]}}  ,  {{lonpharmacies[i]}}</div>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n\n\n      <div *ngSwitchCase="\'kittens\'">\n        <h2>Toutes les pharmacies</h2>\n        <ion-card *ngFor="let h of pharmacies; index as i" class="adv-map">\n          <div style="position: relative;">\n            <img src="../../assets/imgs/{{pharmaciesPhotos[i]}}.JPG">\n          \n          <ion-fab right top>\n            <button ion-fab color="teal" class="fab-map">\n              {{dimunitifpharmacies[i]}}\n            </button>\n          </ion-fab >\n          <ion-item>\n           \n            <h2>{{h}}</h2>\n            <p>{{pointReference[i]}}</p>\n          </ion-item>\n          </div>\n          <ion-card-content>\n            <p>{{compharmacies[i]}}</p>\n          </ion-card-content>\n          <ion-row>\n            <ion-col>\n              <button ion-button icon-start clear small color="teal">\n                <ion-icon name="pin"></ion-icon>\n                <div >Position: {{latpharmacies[i]}}  ,  {{lonpharmacies[i]}}</div>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n\n      </div>\n      <div *ngSwitchCase="\'ducklings\'">\n        <!--h2>Maps not available yet</h2>\n        <ion-fab right bottom>\n          <button ion-fab color="teal" (click)="openMap(\n            {\n              donnees:[selectedItem]\n            }\n          )">\n              <ion-icon name="pin"></ion-icon>\n          </button>\n          \n        </ion-fab-->\n        <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n        <ion-footer>\n  <ion-toolbar color="teal">\n     <ion-row no-padding text-center >\n      <ion-col>\n        <button ion-button clear small color="light" icon-start (click)="change1()" id="btn1">\n          <ion-icon name=\'pin\'></ion-icon>\n          A proximité\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="light" icon-start (click)="change()" id="2">\n          <ion-icon name=\'locate\'></ion-icon>\n          Tous\n        </button>\n      </ion-col>\n</ion-row>\n  </ion-toolbar>\n</ion-footer>\n  </div>\n      </div>\n    </div>\n   \n\n</ion-content>'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\pharmacies\pharmacies.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_dataservice__["a" /* DataServices */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["e" /* Spherical */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], PharmaciesPage);
    return PharmaciesPage;
}());

//------------------------------
var TabP1 = /** @class */ (function () {
    function TabP1(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.pharmaciesLon = [];
        this.pharmaciesL = [];
        this.pharmacies = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.pharmaciesL = this.h.latpharmacies;
        this.pharmaciesLon = this.h.lonpharmacies;
        this.pointReference = this.h.pointReference;
        this.pharmacies = this.h.pharmacies;
        this.maPosition = this.h.maPosition;
    }
    TabP1.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    TabP1.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.pharmaciesL[0], this.pharmaciesLon[0]);
        for (var i = 0; i < this.pharmacies.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.pharmaciesL[i], this.pharmaciesLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.pharmacies[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        //let p = this.getMyLocation();
        //ionic=new LatLng(p.lat, p.lng);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
    };
    TabP1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tabp1',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [PharmaciesPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], TabP1);
    return TabP1;
}());

//*********************
var TabP2 = /** @class */ (function () {
    function TabP2(h, alertCtrl, geoLocation) {
        this.h = h;
        this.alertCtrl = alertCtrl;
        this.geoLocation = geoLocation;
        this.pharmaciesLon = [];
        this.pharmaciesL = [];
        this.pharmacies = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.pharmaciesL = this.h.latpharmacies;
        this.pharmaciesLon = this.h.lonpharmacies;
        this.pointReference = this.h.pointReference;
        this.pharmacies = this.h.pharmacies;
        this.maPosition = this.h.maPosition;
    }
    TabP2.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    TabP2.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {
            mapType: 'MAP_TYPE_HYBRID'
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.pharmaciesL[0], this.pharmaciesLon[0]);
        for (var i = 0; i < this.pharmacies.length; i++) {
            ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.pharmaciesL[i], this.pharmaciesLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic,
                title: '' + this.pharmacies[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        /* let p=this.getMyLocation();
        ionic=new LatLng(p.lat, p.lng);*/
        ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.pharmaciesL[0], this.pharmaciesLon[0]);
        this.map.addMarker({
            position: ionic,
            title: 'Ma position',
            snippet: 'Je suis ici!',
            animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
            icon: 'blue'
        });
        this.map.animateCamera({
            target: ionic,
            zoom: 18,
            tilt: 10
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 10
        };
        // move the map's camera to position
        //this.map.moveCamera(position);
        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    };
    TabP2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tabp2',
            template: "\n    <div id=\"map_canvas\">\n    \n  </div>\n  "
        }),
        __metadata("design:paramtypes", [PharmaciesPage, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], TabP2);
    return TabP2;
}());

//# sourceMappingURL=pharmacies.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(230);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_dataservice__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_sqlite__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















//Native Components



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["a" /* HopitauxPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["a" /* PharmaciesPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["b" /* Tab1 */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["c" /* Tab2 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["b" /* TabP1 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["c" /* TabP2 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["b" /* TabA1 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["c" /* TabA2 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["a" /* AutresPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_maps_maps__["a" /* MapContentPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    backButtonText: 'Précédent',
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    tabsPlacement: 'bottom',
                    pageTransition: 'ios-transition'
                }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_maps_maps__["a" /* MapContentPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["a" /* HopitauxPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["a" /* PharmaciesPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["c" /* Tab2 */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["b" /* Tab1 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["b" /* TabP1 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["c" /* TabP2 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["b" /* TabA1 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["c" /* TabA2 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["a" /* AutresPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["a" /* HopitauxPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["a" /* PharmaciesPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["b" /* Tab1 */],
                __WEBPACK_IMPORTED_MODULE_11__pages_hopitaux_hopitaux__["c" /* Tab2 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["b" /* TabP1 */],
                __WEBPACK_IMPORTED_MODULE_12__pages_pharmacies_pharmacies__["c" /* TabP2 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["b" /* TabA1 */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["c" /* TabA2 */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_13__pages_autres_autres__["a" /* AutresPage */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["e" /* Spherical */],
                __WEBPACK_IMPORTED_MODULE_8__providers_dataservice__["a" /* DataServices */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_autres_autres__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_hopitaux_hopitaux__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_pharmacies_pharmacies__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Acceuil', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], iconImg: 'home' },
            { title: 'Pharmacies', component: __WEBPACK_IMPORTED_MODULE_8__pages_pharmacies_pharmacies__["a" /* PharmaciesPage */], iconImg: 'boat' },
            { title: 'Hopitaux', component: __WEBPACK_IMPORTED_MODULE_7__pages_hopitaux_hopitaux__["a" /* HopitauxPage */], iconImg: 'flask' },
            { title: 'Autres', component: __WEBPACK_IMPORTED_MODULE_5__pages_autres_autres__["a" /* AutresPage */], iconImg: 'flask' },
            { title: 'Nous aider...', component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */], iconImg: 'boat' },
            { title: 'A propos', component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */], iconImg: 'paper-plane' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <div>\n      <img style=" padding: 10%;" src="../assets/imgs/logo_QH.png" />\n    </div>\n\n  </ion-header>\n\n  <ion-content>\n    <ion-list class="list list-md">\n      <!--button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button-->\n      <button menuClose *ngFor="let p of pages" (click)="openPage(p)" class="item item-block item-md" icon-start="" ion-item="">\n        <ion-icon item-start="" role="img" class="icon icon-md item-icon" [name]="p.iconImg" style="color: rgb(230, 49, 53);" aria-label="logo angular"></ion-icon>\n\n        <!---->\n        {{p.title}}\n        <div class="button-effect" style="transform: translate3d(61px, -33px, 0px) scale(1); height: 140px; width: 140px; opacity: 0; transition: transform 412ms ease 0s, opacity 289ms ease 123ms;"></div>\n\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataServices = /** @class */ (function () {
    function DataServices(http) {
        this.http = http;
        this.url = "https://api.myjson.com/bins/sfqki";
    }
    DataServices.prototype.getDatas = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); }).do(function (res) { return console.log(res); }).catch(this.catchError);
    };
    DataServices.prototype.catchError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(error.json().error || "Server error");
    };
    DataServices = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], DataServices);
    return DataServices;
}());

//# sourceMappingURL=dataservice.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapContentPage = /** @class */ (function () {
    function MapContentPage(alertCtrl, viewCtrl) {
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.hopitauxLon = [];
        this.hopitauxL = [];
        this.hopitaux = [];
        this.pointReference = [];
        this.h.createDatabaseFile();
        this.hopitauxL = this.h.latHopitaux;
        this.hopitauxLon = this.h.lonHopitaux;
        this.pointReference = this.h.pointReference;
        this.hopitaux = this.h.hopitaux;
    }
    MapContentPage.prototype.ionViewDidLoad = function () {
        this.h.createDatabaseFile();
        this.loadMap();
    };
    MapContentPage.prototype.loadMap = function () {
        // Create a map after the view is ready and the native platform is ready.
        var options = {};
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', options);
        var ionic = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[0], this.hopitauxLon[0]);
        for (var i = 0; i < this.hopitaux.length; i++) {
            var ionic_1 = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](this.hopitauxL[i], this.hopitauxLon[i]);
            // create new marker
            var markerOptions = {
                position: ionic_1,
                title: '' + this.hopitaux[i],
                snippet: '' + this.pointReference[i],
                animation: __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsAnimation */].DROP,
                icon: 'blue',
            };
            this.map.addMarker(markerOptions)
                .then(function (marker) {
                marker.showInfoWindow();
            });
        }
        this.map.animateCamera({
            target: ionic,
            zoom: 10,
            tilt: 30
        }).then(function () {
        });
        // create CameraPosition
        var position = {
            target: ionic,
            zoom: 10,
            tilt: 30
        };
        // move the map's camera to position
        this.map.moveCamera(position);
        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    };
    MapContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MapContentPage.prototype.onMapReady = function () {
        console.log('map is ready!');
    };
    MapContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\maps\maps.html"*/'<ion-header>\n  <ion-toolbar color="teal">\n        \n    <ion-title>\n      Carte\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <!--ion-icon name="close" style="opacity:1;" hideWhen="android,windows"></ion-icon>\n        <ion-label>Close</ion-label-->\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div id="map_canvas"></div>\n</ion-content>\n '/*ion-inline-end:"C:\Users\Mourad\Desktop\Projets\QuickHealth\QuickHealth\src\pages\maps\maps.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */]])
    ], MapContentPage);
    return MapContentPage;
}());

//# sourceMappingURL=maps.js.map

/***/ })

},[209]);
//# sourceMappingURL=main.js.map