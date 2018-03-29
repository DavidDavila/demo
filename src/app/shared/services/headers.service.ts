import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import {IAppState} from "../../store/"; import {VideoActions} from './../../actions/video.action';

declare const jQuery: any;
@Injectable()
export class HeadersService {
  id: string;
	authorizationHeader: any = null;
	authorization: any = null;
  constructor(   ) { }
  getId(){
    return this.id;
  }
  getHeaders(){
  	
  	let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  	if( this.authorizationHeader ) {
  		headers.append(this.authorizationHeader, this.authorization);
  	}
    let options: RequestOptions = new RequestOptions({ headers: headers, withCredentials: false });
    
    return options;
  }
  setHeaders(authorizationHeader: any, authorization: any) {
  	this.authorization = authorization;
  	this.authorizationHeader = authorizationHeader;
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(authorizationHeader,authorization);
    jQuery.ajaxSetup({
      headers: headers.toJSON(),
      dataFilter: ((data, type) => {
        if( data && JSON.parse(data) && JSON.parse(data).id) {          
          this.id = JSON.parse(data).id;          
        }          
        return data;
        }).bind(this)
     })
  }
}