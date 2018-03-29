import { Component, OnInit } from '@angular/core';
import { HeadersService } from './shared/services/headers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
	constructor(private _headersService: HeadersService){

	}

  ngOnInit() {
  	this._headersService.setHeaders('Authorization', 'Bearer 720b96f7-0b8b-468d-94ba-59c769ae28de')
  }
}
