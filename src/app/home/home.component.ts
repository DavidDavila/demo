import { Component, OnInit} from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import {IAppState} from "../store/"; 
import {IntroActions} from './../actions/intro.action';

declare const window
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@select(['intro', 'backgroundPosition']) currentSection$: Observable<any>;  
	private currentSection: number;
  private positions: Array<number> = [];
	constructor(
		private ngRedux: NgRedux<IAppState>,
		private _introActions: IntroActions
	) {
		this.currentSection$.subscribe( value => {
			if (value) {
				this.currentSection = value;
			}
		})
	}

  ngOnInit() {
   
  }

}
