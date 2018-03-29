import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import {IAppState} from "../../../store/"; 
import {IntroActions} from './../../../actions/intro.action';
import {VideoActions} from './../../../actions/video.action';
import {FormControl} from '@angular/forms';
import {SessionService} from '../../../shared/services/session.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


	public myStyle: object = {};
	public myParams: object = {};
	public width: number;
	public height: number;
  public currentSection;
  public url: string;
  public documentValue = new FormControl();
  public countryValue = new FormControl();
  public videoIdList: any = [];
  @select(['intro', 'backgroundPosition']) currentSection$: Observable<any>;  
  @select(['video']) video$: Observable<any>;  
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private _introActions: IntroActions,
    private _videoActions:VideoActions,
    private _sessionService:SessionService,
    private _formBuilder: FormBuilder
  ) {
    this.currentSection$.subscribe( value => {
      if (value) {        
        this.currentSection = value;        
      }
    })
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
         firstCtrl: ['', Validators.required]
       });
       this.secondFormGroup = this._formBuilder.group({
         secondCtrl: ['', Validators.required]
       });
    this.countryValue.setValue([ { "id": 61, "country": "esp", "countryName": "Spain", "type": "Passport", "name": "PASAPORTE", "icao": "TD3", "scanWidth": 640 }, { "id": 62, "country": "esp", "countryName": "Spain", "type": "IdCard", "name": "DNI", "kind": "DNI", "icao": "TD1", "scanWidth": 480 }, { "id": 188, "country": "esp", "countryName": "Spain", "type": "IdCard", "name": "NIE", "kind": "NIE", "icao": "TD1", "scanWidth": 480 }, { "id": 195, "country": "esp", "countryName": "Spain", "type": "DriverLicense", "name": "DRIVER LICENSE", "icao": "EULICENSE", "scanWidth": 640 } ])
  	this.documentValue.setValue({ "id": 62, "country": "esp", "countryName": "Spain", "type": "IdCard", "name": "DNI", "kind": "DNI", "icao": "TD1", "scanWidth": 480 })
    this._sessionService.getVideoIdList().then(( res )=> {
      this.agroupByCountries(res);
      this.shortByName(this.videoIdList);
    })
  }
  compareData(t1: any, t2: any): boolean { 
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
  shortByName( data ) {
    this.videoIdList.sort(function(a,b) {
      return (a[0].countryName > b[0].countryName) ? 1 : ((b[0].countryName > a[0].countryName) ? -1 : 0);
    }); 
  }
  agroupByCountries( list ) {
    for (let i = 0; i < list.length; i++) {
      if(list[i].country) {
        list[i].country = list[i].country.toLocaleLowerCase()
        let finded = false;
        for (let j = 0; j < this.videoIdList.length; j++) {
          if(list[i].country === this.videoIdList[j][0].country && !finded ){
            this.videoIdList[j].push(list[i])
            finded = true;            
          }
        }
        if( !finded) {
          this.videoIdList.push([list[i]])
        }
      }
    }
  }
  configureParticles(){
  	this.myStyle = {
      'position':' static',
      'width': '100%',
      'height': this.height + 'px',
    };
    this.myParams = {
  	  "particles": {
  	    "number": {
  	      "value": 154,
  	      "density": {
  	        "enable": true,
  	        "value_area": 800
  	      }
  	    },
  	    "color": {
  	      "value": "#b5bf03"
  	    },
  	    "shape": {
  	      "type": "circle",
  	      "stroke": {
  	        "width": 0,
  	        "color": "#000000"
  	      },
  	      "polygon": {
  	        "nb_sides": 5
  	      }  	     
  	    },
  	    "opacity": {
  	      "value": 0.5,
  	      "random": false,
  	      "anim": {
  	        "enable": false,
  	        "speed": 1,
  	        "opacity_min": 0.1,
  	        "sync": false
  	      }
  	    },
  	    "size": {
  	      "value": 3,
  	      "random": true,
  	      "anim": {
  	        "enable": true,
  	        "speed": 5,
  	        "size_min": 0.1,
  	        "sync": true
  	      }
  	    },
  	    "line_linked": {
  	      "enable": true,
  	      "distance": 173.61248115909999,
  	      "color": "#b5bf03",
  	      "opacity": 0.68,
  	      "width": 1
  	    },
  	    "move": {
  	      "enable": true,
  	      "speed": 1.7,
  	      "direction": "none",
  	      "random": true,
  	      "straight": false,
  	      "out_mode": "out",
  	      "bounce": true,
  	      "attract": {
  	        "enable": true,
  	        "rotateX": 1262.6362266116362,
  	        "rotateY": 1200
  	      }
  	    }
  	  },
  	  "interactivity": {
  	    "detect_on": "canvas",
  	    "events": {
  	      "onhover": {
  	        "enable": false,
  	        "mode": "repulse"
  	      },
  	      "onclick": {
  	        "enable": false,
  	        "mode": "push"
  	      },
  	      "resize": true
  	    },
  	    "modes": {
  	      "grab": {
  	        "distance": 400,
  	        "line_linked": {
  	          "opacity": 1
  	        }
  	      },
  	      "bubble": {
  	        "distance": 400,
  	        "size": 40,
  	        "duration": 2,
  	        "opacity": 8,
  	        "speed": 3
  	      },
  	      "repulse": {
  	        "distance": 200,
  	        "duration": 0.4
  	      },
  	      "push": {
  	        "particles_nb": 4
  	      },
  	      "remove": {
  	        "particles_nb": 2
  	      }
  	    }
  	  },
  	  "retina_detect": true
  	}
  }
  imgLoad(img) {
    let target = img.srcElement || img.target;
  	this.width = target.width - 40;
  	this.height = target.height/1.7  - 40;
  	this.configureParticles();
  }
  startDemo() {
    this.ngRedux.dispatch(this._introActions.setBackgroundPosition( 4 ))
    this.ngRedux.dispatch(this._videoActions.setDocumentType(this.documentValue.value));
  }


}
	