import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import {IAppState} from "../../store/"; 
import {IntroActions} from './../../actions/intro.action';
import {VideoActions} from './../../actions/video.action';
import {SessionService} from '../../shared/services/session.service';
import { trigger, style, transition, animate, group } from '@angular/animations';

declare const EID: any;
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate(650)
      ]),
      transition(':leave', [
        style({transform: 'scale(0)'}),
        animate(650)
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
	public videoId: any;
	public eid: any = EID;
	private videoValue: any
	@select(['intro', 'backgroundPosition']) currentSection$: Observable<any>;  
	@select(['video']) videoSub$: Observable<any>;  
  constructor(
  	 private ngRedux: NgRedux<IAppState>,
	   private _introActions: IntroActions,
	   private _videoActions:VideoActions,
	   private _sessionService:SessionService,
  ) { 
  	this.videoSub$.subscribe( value => {
  		if (value.documentType && value.documentType.id && !this.videoId) {  			
		/*	this.initVideo( value.documentType );*/
  		}
  	})
  }

  ngOnInit() {
  	
  }
 /* initVideo( document: any){
	  this.eid.init({
	    lang: 'en',
	    token: 'df843b77-443d-4241-a7dd-d92332e68383',
	    eidApi: 'https://server/v2/',
	    proxyEndpoint: 'https://server/v2/',
	  }).then( (res)=>{
	    this.videoId = this.eid.videoId('#video')
	    this.videoId.turnOn().then((res)=>{
	      this.videoId.start({
		      idType: document.id,
		      minSimilarityLevel: 'Low'
		    }).then( (video) => {
		    	this._sessionService.getVideo();
		    	this.ngRedux.dispatch(this._introActions.setBackgroundPosition( 5 ))
		     }, 
		     (error) =>{
		     });
	    });
    	this.videoId.onVideoIDPhaseStarting( (phase) => {
    	this._sessionService.getVideo();
  			phase.continue();
  		});
    })

  }*/
}
