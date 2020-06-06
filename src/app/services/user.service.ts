import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity;
	public token;
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	signup(user_to_login, gethash = null){
		if(gethash != null){
			user_to_login.gethash = gethash;
		}
		let json = JSON.stringify(user_to_login);
		let params = json;

		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'login', params, {headers: headers});
	}

	register(user_to_register){
		let json = JSON.stringify(user_to_register);
		let params = json;

		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'register', params, {headers: headers});
	}

	updateUser(user_to_update){
		let json = JSON.stringify(user_to_update);
		let params = json;

		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		});

		return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
}