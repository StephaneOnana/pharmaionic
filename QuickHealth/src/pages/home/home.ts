import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataServices } from '../../providers/dataservice';

export declare var h:Array<string>;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	donnees=[];
	h=[];
  constructor(public navCtrl: NavController, private dataservice: DataServices) {
  	 this.dataservice.getDatas().subscribe(data=>{this.donnees=data;this.h=data.hopitaux;});
  }

}
