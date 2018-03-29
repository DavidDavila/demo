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
  	this._headersService.setHeaders('Authorization', 'Bearer df843b77-443d-4241-a7dd-d92332e68383')
  }
}
