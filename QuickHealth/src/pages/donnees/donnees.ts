import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavController, Platform, ModalController, AlertController } from 'ionic-angular';
import { DataServices } from '../../providers/dataservice';
import 'rxjs/add/operator/map';


const DATABASE_FILENAME: string ='quickhealth.db';
const ID_JSON="9934d7c8ee514aa58544a43691e2acf9";
export declare var h:Array<string>;

@Injectable()
export class DonneesPage {
	
	private db: SQLiteObject;
	donnee=[];
	public versionJSON:any;
	public pharmacies=[];
	hopitaux=[];
	public divers=[];

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

    public latDivers=[];
    public lonDivers=[];
    public pointReferencesDivers=[];
    public comDivers=[];
    public typesDivers=[];
    public dimunitifDivers=[];

	constructor(public navCtrl: NavController, private sqlite: SQLite, public alertCtrl: AlertController, private http: HttpClient, private dataService: DataServices){
		this.createDatabaseFile();
	};

	ioniViewDidLoad(){
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
		  	//this.getDatas();
		  	//this.updateTables();
		  })
		  .catch(e => console.log(e));

	}

	public createTables():void {

		this.db.executeSql('CREATE TABLE IF NOT EXISTS `PHARMACIES` (`idPharmacie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL ,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{
			
		}).catch(e=>console.log(e));
		

		this.db.executeSql('CREATE TABLE IF NOT EXISTS `HOPITAUX` (`idHopital` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT)',{}).then(()=>{
		}).catch(e=>console.log(e));


		this.db.executeSql('CREATE TABLE IF NOT EXISTS `DIVERS` (`idInfrastructure` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nom` TEXT NOT NULL UNIQUE,`diminutif` TEXT NOT NULL,`latitude` REAL NOT NULL,`longitude` REAL NOT NULL,`pointReference` TEXT,`commentaires` TEXT, `type` TEXT NOT NULL)',{}).then(()=>{
			
		}).catch(e=>console.log(e));
		
	}
	

	public getDatas():void{

	 	 this.db.executeSql('SELECT * FROM `PHARMACIES`', {})
		.then((data) => {

			if(data == null) {
				
			}

			if(data.rows.length > 0) {
				this.alertCtrl.create({
			  	title:'	SELECT Created...',
			  	buttons:['OK']
		  	}).present();
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
			            this.pharmacies.push(data.rows.item(i).nom);
			            this.dimunitifPharmacies.push(data.rows.item(i).dimunitif);
			            this.latPharmacies.push(data.rows.item(i).latitude);
			            this.lonPharmacies.push(data.rows.item(i).longitude);
			            this.pointReferencesPharmacies.push(data.rows.item(i).pointReference);
			            this.comPharmacies.push(data.rows.item(i).commentaires);
		          }
				}
			}
		});


		 this.db.executeSql('SELECT * FROM `HOPITAUX`', {})
		.then((data) => {

			if(data == null) {
				return;
			}

			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
			            this.hopitaux.push(data.rows.item(i).nom);
			            this.dimunitifHopitaux.push(data.rowws.item(i).dimunitif);
			            this.latHopitaux.push(data.rows.item(i).latitude);
			            this.lonHopitaux.push(data.rows.item(i).longitude);
			            this.pointReferencesHopitaux.push(data.rows.item(i).pointReference);
			            this.comHopitaux.push(data.rows.item(i).commentaires);
		          }
				}
			}
		});

		 this.db.executeSql('SELECT * FROM `DIVERS`', {})
		.then((data) => {

			if(data == null) {
				return;
			}

			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
			            this.divers.push(data.rows.item(i).nom);
			            this.dimunitifDivers.push(data.rowws.item(i).dimunitif);
			            this.latDivers.push(data.rows.item(i).latitude);
			            this.lonDivers.push(data.rows.item(i).longitude);
			            this.pointReferencesDivers.push(data.rows.item(i).pointReference);
			            this.comDivers.push(data.rows.item(i).commentaires);
			            this.typesDivers.push(data.rows.item(i).type);
		          }
				}
			}
		});
    
	}


	

	public putDatas():void {


	this.dataService.getDatas().subscribe(data=>{this.donnee=data;this.hopitaux=data.hopitaux;});
		
		
		this.alertCtrl.create({
			  	title:'${this.hopitaux[0]}',
			  	buttons:['OK']
		  	}).present();
		
		
	//FIN
	}

	public updateTables():void {

		/*this.http.get("https://api.myjson.com/bins/sfqki").subscribe((res: any)=>{this.donnee=res.json()});

		if(this.donnee.version!=this.versionJSON){
			if(this.donnee.version>this.versionJSON){
				this.db.executeSql('DELETE * FROM `PHARMACIES`',{}).then(()=>{
					this.db.executeSql('DELETE * FROM `HOPITAUX`',{}).then(()=>{
						this.db.executeSql('DELETE * FROM `DIVERS`',{}).then().catch(e => console.log(e));
					}).catch(e => console.log(e));
				}).catch(e => console.log(e));
				this.putDatas();

			}
		}*/

	}

}