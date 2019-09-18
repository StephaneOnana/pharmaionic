import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataServices {
	

	private url="https://api.myjson.com/bins/sfqki";

	constructor(public http:Http){

	}


	getDatas(){
		return this.http.get(this.url)
		.map((res:Response) =>res.json()).do((res:Response)=>console.log(res)).catch(this.catchError);
	}

	getStatusOfConnexion():any{
		return this.http.get(this.url)
		.map((res:Response) =>res.json().status);
	}

	private catchError(error: Response | any){
		return Observable.throw(error.json().error || "Server error");
	}

}