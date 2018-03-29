import { Component, OnInit } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import {IAppState} from "../../store/"; 
import {IntroActions} from './../../actions/intro.action';
declare const window;
declare const TweenMax;
declare const Expo;


@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

	public sectionsArray: Array<any>;
	public section2: any;
	public section3: any;
	public points: Array<string> = [
		'1441.5,0 1922,0 1922,976 1057.1000000000001,976 ',
		'3844,-292.79999999999995 -1922,1464 3844,976 3844,292.79999999999995  '
	];
	public currentSection: number;
	private conf: any = {
		totalSections: 3
	}
	private interval: any;

	@select(['intro', 'backgroundPosition']) currentSection$: Observable<any>;  
  constructor(
  	private ngRedux: NgRedux<IAppState>,
  	private _introActions: IntroActions,
  ) {
  	this.configureSections();
  	this.currentSection$.subscribe( value => {
  		if (value) {  			
  			this.currentSection = value;  			
  			this.morphingPaths(this.currentSection - 1);
  			this.ngRedux.dispatch(this._introActions.setBackgroundPosition(this.currentSection))
  		}
  	})
  }
  ngOnInit() {  	
	 	this.configureBackground();
	 	window.onresize = () => {
	 		this.configureSections();
	 		 this.morphingPaths(this.currentSection)
	 	}
	}
	configureSections() {
		let w = window.innerWidth;
		let h = window.innerHeight
		this.sectionsArray = [
			{
		    path1: [
		      { x: 0, y: h },
		      { x:  w * 0.7, y: h },
		      { x: w * 0.1, y: 0 },
		      { x: 0, y: 0 },
		    ],
		    path2: [
		      { x: w * 0.9, y: h },
		      { x: -w, y:  h * 0.4 },
		      { x: -w, y: h },
		      { x:  w * 2, y: h *2 },	      
		    ]
		  },
		  {
		    path1: [
		      { x: w * 0.75, y: 0 },
		      { x: w, y: 0 },
		      { x: w, y: h },
		      { x: w * 0.55, y: h }
		    ],
		    path2: [
		      { x: w *2 , y: h * -0.3  },
		      { x: -w , y: h * 1.5  },
		      { x: w* 2, y: h },
		      { x: w * 2, y: h * 0.3  }
		    ]
		  },
		  {
		    
		    path1: [
		      { x: w * 0.2, y: 0 },
		      { x: w, y: 0 },
		      { x: w, y: h },
		      { x: w,  y: h* 0.8 }
		    ],
		    path2: [
		      { x: w , y:0},
		      { x: -w, y: 0 },
		      { x: -w, y: h * -0.3 },
		      { x: w , y: h * 0.45 },
		    ],
		  },	
		  {
		    path1: [
		      { x: w * 0.05 , y: h},
		      { x: 0, y: h  },
		      { x: w , y: h },
		      { x: w , y: 0 },		      
		    ],
		    path2: [
		      { x:	w*0.5, y: 0},
		      { x: 0, y: h  },
		      { x: w , y: h },
		      { x: w , y: 0 },	
		    ]
		  },
		  {
  		    path1: [
  		      { x: 0, y: h },
  		      { x:  w * 0.3, y: h },
  		      { x: 0, y: h * 0.3 },
  		      { x: 0, y: h * 0.3 },
  		    ],
  		    path2: [
  		      { x: w * 0.5, y: h },
  		      { x: 0, y:  h * 0.7 },
  		      { x: 0, y: h },
  		      { x:  w , y: h },	      
  		    ]
  		  },
		];
	}
	configureBackground() {		
			let goTo = this.currentSection >= this.conf.totalSections ? 1 : ++this.currentSection ;
			this.ngRedux.dispatch(this._introActions.setBackgroundPosition( goTo ));
			this.interval = setInterval((()=>{
				let goTo = this.currentSection >= this.conf.totalSections ? 1 : ++this.currentSection ;				
				this.ngRedux.dispatch(this._introActions.setBackgroundPosition( goTo ));
			}).bind(this), 5000);
	}
	morphingPaths(section) {	
		if(this.currentSection === 4 ) {
			clearInterval(this.interval)
		} 		
	  this.switchToPath(0, section, 'path1');
	  setTimeout((() => {
	    this.switchToPath(1, section, 'path2');
	  }).bind(this), 200);
		
	}
	switchToPath($path, section, sectionPath) {
		if(this.sectionsArray[section]) {


		  var pathPoints = this.sectionsArray[section][sectionPath];
		  var points = '';
		  
		  this.conf[sectionPath] = []; // reset var path1/path2
		  let actualPoints = this.points[$path].split(' ')  // punti corretti dell'svg
		  
		  
		  // creo un oggetto path1 / path2 che abbia i punti iniziali e finali
		  for (var i = 0; i < pathPoints.length; i++) {
		    let actualPoint = actualPoints[i].split(',');
		    
		    let obj = {
		      x: actualPoint[0],
		      endX: pathPoints[i].x,
		      y: actualPoint[1],
		      endY: pathPoints[i].y
		    }
		    
		    // path1 / path2
		    this.conf[sectionPath].push(obj);
		  }
		  // animo con GSAP
		  for (var i = 0; i < this.conf[sectionPath].length; i++) {
		    let p = this.conf[sectionPath][i];
		    TweenMax.to(p, 1, {
		      x: p.endX,
		      y: Number(p.endY),
		      ease: Expo.easeInOut,
		      delay: i * .25,
		      onUpdate: ()=> {this.animatePath($path, this.conf[sectionPath])}
		     }, .2);
		  }	
		}  
	}
	animatePath($path, path) {   
    var points = '';
    for (var i = 0; i < path.length; i++) {
      var point = path[i].x + ',' + path[i].y;
      points += point + ' ';
    }
    this.points[$path] = points;
  }
}
