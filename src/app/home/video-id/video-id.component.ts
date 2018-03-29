import { Component, OnInit } from '@angular/core';
declare const EID: any;
declare const window: any;


@Component({
  selector: 'video-id',
  templateUrl: './video-id.component.html',
  styleUrls: ['./video-id.component.scss']
})
export class VideoIdComponent implements OnInit {
	public video: any; 
	public eid: any = EID;
	public videoId;
	private utterance: any;
	private step: string;
	public roi: any;
	private text: any = {
		FRONT: 'First, We are going to scan the front side of the document',
		BACK: 'We are going to scan the back of the document',
		FACE: 'Finally we need you to look forward to scan your face'
	};

  constructor() { }

  ngOnInit() {
  	this.video = document.getElementById("videoElement");
  	this.prepareVoice();
  	/*this.turnOn();
  	this.createParentNode(this.video);*/
  	this.initTest();
  }
  prepareVoice() {

	this.utterance = new SpeechSynthesisUtterance();
  	window.speechSynthesis.onvoiceschanged = (() => {
  	    window.speechSynthesis.getVoices();
  	});
  	this.utterance.volume = 0;
	this.utterance.rate = 1;
	window.speechSynthesis.onvoiceschanged = (( event ) => {					    
		console.log(event)
		this.utterance.voice = window.speechSynthesis.getVoices()[4];						
	}).bind(this);
  }
  speak(msg) {
  	if( this.utterance.volume ){
	  	this.utterance.text = msg;   	
		window.speechSynthesis.speak(this.utterance); 
	}
  }
  turnOn() {
  	let n = <any>navigator;
  	n.getUserMedia = n.getUserMedia || n['webkitGetUserMedia'] || n['mozGetUserMedia'] || n['msGetUserMedia'] || n['oGetUserMedia'];
  	
  	if (n.getUserMedia) {       
	    n.getUserMedia({video: true}, (stream)=> {
	    	this.video.setAttribute('autoplay', true);
	    	this.video.srcObject = stream;	    	
	    }, 
	    (error) => {
	    });
  	}  	 
  }
  createParentNode( element) {

  	let parent = element.parentNode;
  	let container = document.createElement('div');
  	let legend = document.createElement('div');
  	let error = document.createElement('div');
  	let legendStep = document.createElement('div');
  	let logo = document.createElement('a');
  	let help = document.createElement('a');
  	let volume = document.createElement('a');
  	let loading = document.createElement('div');
  	let detection = document.createElement('div');

  	error.id = 'error';
  	legendStep.id = "legend-step";  	
  	legend.id = 'legend';
  	help.id = 'help';
  	help.innerHTML = '?';
  	help.addEventListener('click',( ()=>{
  		help.classList.toggle("active");
  		legend.classList.toggle("open");
  		legendStep.classList.toggle("open");
  		if (help.classList.contains('active')) {

  			this.speak(this.text[this.step]);
  			let playButton = document.querySelector('.contain');
  			let evObj = document.createEvent('Events');
		    evObj.initEvent('click', true, false);
		    setTimeout((()=>{
		    	playButton.dispatchEvent(evObj);

		    }).bind(this), 1500)
  		}

  	}).bind(this))
  	container.id = 'video-container';
  	container.className = "loading";  
  	volume.id = 'volume';
  	volume.addEventListener('click', (() =>{
  		volume.classList.toggle("active");
  		if (volume.classList.contains('active')) {
  		this.utterance.volume = 1;
  		} else{
  			this.utterance.volume = 0;
  		}
  	}).bind(this));
  	logo.id= "logo-eid";
  	logo.href = 'https://www.electronicid.eu/';
	logo.target = '_blank';

  	loading.id = 'video-loading',
  	loading.innerHTML =`
			<div id="video-instructions">
				<img src="assets/img/logo-big.png" alt="">
				<h3>Instructions</h3>
				<ul>
					<li>
						<span>1</span>Ten a mano tu documento de identificación</li>
					<li>
						<span>2</span>Se escaneará la parte delantera del documento</li>
					<li>
						<span>3</span>Se escaneará la parte delantera del documento</li>
					<li>
						<span>4</span>Se escaneará su cara</li>
				</ul>
			</div>
			<p>Connecting</p>
			<div id="video-progress-bar">
			</div>
			<button> Start</button>
  	`;
	
  	detection.id = "video-detection";
  	/*<svg id="roi-svg">
  			     <defs>
  			    <filter id="f1" x="0" y="0">
  			      <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
  			    </filter>
  			  </defs>
  			<polygon filter="url(#f1)"  id="roi"> </polygon>
  			</svg>*/
  	detection.innerHTML = `
  			<span class="top-left mark-roi">
  					<div class="spinner"><span></span></div>
  					<p id="video-notification" style="">Encuadre la parte delantera de su documento dentro del rectángulo</p>
  					<div id="animation-scanned" class="hide">	
  						
  					</div>
  			</span>
  			<!-- span class="top-right mark-roi"></span>
  			<span class="bottom-left mark-roi"></span>
  			<span class="bottom-right mark-roi"></span>
  			 -->
			<svg id="rectangle">
			  <polygon style="stroke:#b5bf03;fill:transparent;stroke-width:2"> 
					<animate id="animation-to-click" fill="freeze" attributeName="points" dur="200ms" />
			  </polygon>
			</svg>
  	`;
  	legend.appendChild(volume);  	
  	legend.appendChild(help);
  	legend.appendChild(logo);
  	legend.appendChild(legendStep);
  	parent.replaceChild(container, element);
  	container.appendChild(legend);
  	container.appendChild(loading);
  	container.appendChild(element);
	container.appendChild(detection);
	}
	connected() {
		console.log('connected!')
		let loading = document.getElementById("video-loading");
		loading.className = "loaded"
		loading.querySelector('p').innerHTML = 'Connected';
		loading.querySelector('button').addEventListener('click', ()=> {
			let container = document.getElementById("video-container");
			container.className = '';
			setTimeout(()=>{
				let container = document.getElementById('video-container');
				let loading = document.getElementById("video-loading");
				container.removeChild(loading);
			},600)
		})
	}
	detected( rectangle: any){
		let detection = document.getElementById('video-detection');
		let svg = detection.querySelector('svg#rectangle');
		let points = [];
		for (let i in rectangle) {
			points.push(rectangle[i].x + ' ' + rectangle[i].y )
		}
		if (!svg.querySelector('polygon').getAttribute('points')){
			svg.querySelector('polygon').setAttribute('points',points.join())
		} else {
			svg.querySelector('polygon').setAttribute('points', svg.querySelector('animate').getAttribute('to'))		
		}
		let spinner = document.getElementsByClassName('spinner')[0];
	    spinner['style'].top = rectangle.p1.y + 'px';
	    spinner['style'].left = rectangle.p1.x + 'px';
	    spinner['style'].width = (rectangle.p2.x - rectangle.p1.x) + 'px';
	    spinner['style'].height = (rectangle.p4.y - rectangle.p1.y) + 'px';
		svg.querySelector('animate').setAttribute('to', points.join())
		let anim = document.getElementById('animation-to-click');
		anim['beginElement']()
	}
	showNotification(not) {
		let notification = document.getElementById('video-notification');
		/*if(notification.classList.contains('show')) {
			notification.classList.remove('show')
		}*/
		notification.className = not.type;
		notification.innerHTML = not.message;
		notification.classList.add('show')
		not.ttl && setTimeout( ()=> { this.hideNotification() }, not.ttl);
		

	}
	hideNotification() {	

		let notification = document.getElementById('video-notification');
		notification.classList.toggle("show");
	}
	connectEvents() {
		this.videoId.ui.onConnecting =  () => { console.log("UI - Connecting..."); };
		this.videoId.ui.onConnected =  this.connected;
	}
	detectDocEvent() {
		this.videoId.ui.onDocDetectionAttempted = (detection) => {
			console.log(detection)
	      	let detectionDiv = document.getElementById('video-detection');
	      	let spinner = detectionDiv.getElementsByClassName('spinner');
	      	let notification = document.getElementById('video-notification');
		    let canvas = document.getElementsByClassName('top-left')[0]
	      	if(detection.fit) {
	      		  !canvas.classList.contains('color')? canvas.classList.add('color') :'';
	      	} else{
	      		canvas.classList.remove('color');
	      	}
		};
	}
	onPhaseStarting(){
		this.videoId.ui.onPhaseStarting = ((phase) => {
			let legendStep = document.getElementById('legend-step');
			this.step = phase.name;
			let text = this.text[this.step];
			switch (phase.name) {
				case "FRONT":
					
					legendStep.innerHTML = `
						<div>	
							<h3>Scanning Front Side</h3>
							<p>	` + text + `</p>
							<div class="contain">	
								<video src="/assets/media/front.webm" muted></video>
								<div class="controls"></div>
							</div>
							<button>Continue</button>
						</div>
				  	`;				  
					break;
				case "BACK":
					legendStep.innerHTML = `
						<div>	
							<h3>Scanning BACK Side</h3>
							<p>	` + text + `</p>
							<div class="contain">	
								<video src="/assets/media/front.webm" muted></video>
								<div class="controls"></div>
							</div>
							<button>Continue</button>
						</div>
				  	`;
					break;

				case "FACE":
					legendStep.innerHTML = `
						<div>	
							<h3>Scanning FACE</h3>
							<p>	` + text + `</p>
							<div class="contain">	
								<video src="/assets/media/front.webm" muted></video>
								<div class="controls"></div>
							</div>
							<button>Continue</button>
						</div>
				  	`;
					break;
				
				default:
					// code...
					break;
			}			
		  	let playButton = document.querySelector('.contain');
		  	let legend = document.querySelector('#legend');
		  	playButton.addEventListener('click', (event)=>{
		  		let video = event.currentTarget['querySelector']('video');
		  		video.paused ? video.play() : video.pause();
		  		video.onended = (() => {
		  		  	let playButton = legendStep.querySelector('.contain');
		  		  	playButton.classList.toggle("playing");
		  		}).bind(this);
				event.currentTarget['classList'].toggle("playing");
		  	})
		  	let continueButton = legendStep.querySelector('button');
		  	continueButton.addEventListener('click',( ()=>{
		  		let help = legend.querySelector('#help');
		  		help.classList.toggle("active");
		  		legend.classList.toggle("open");
		  		legendStep.classList.toggle("open");
		  	}).bind(this));
		  	this.speak(text);
		    console.log("UI - Phase Starting: ", phase);
		    setTimeout(phase.continue, 2000);
		}).bind(this);
	}

	initTest(){
	  this.eid.init({
	    lang: 'en',
	    token: '720b96f7-0b8b-468d-94ba-59c769ae28de',
	    eidApi: 'https://etrust-sandbox.electronicid.eu/v2/',
	    proxyEndpoint: 'https://etrust-sandbox.electronicid.eu/v2/',
	  }).then( (res)=>{
	    this.videoId = this.eid.videoId('#videoElement');
	    this.createParentNode( this.video) 
	    this.videoId.turnOn().then((res)=>{
	    	this.testLogs();
	    	this.connectEvents();
	    	this.detectDocEvent();
	    	this.onPhaseStarting();
	      this.videoId.start({
		      idType: 62,
		      minSimilarityLevel: 'Low'
		    }).then( (video) => {
		    		
		     }, 
		     (error) =>{
		     });
	    });

    	this.videoId.onVideoIDPhaseStarting( (phase) => {
    		console.log('onVideoIDPhaseStarting', phase)
  			phase.continue();
  		});
    })
  }



	testLogs(){
		
		this.videoId.ui.onReconnecting = function () { console.log("UI - Reconnecting...");debugger; };
		this.videoId.ui.onReconnected = function () { console.log("UI - Reconnected");debugger; };
		this.videoId.ui.onDisconnected = function () { console.log("UI - Disconnected");debugger; };

	
		this.videoId.ui.onPhaseStarted = function (phase) {

		    console.log("UI - Phase Started: ", phase);
		    let videoContainer = document.getElementById('video-container');
		    let topLeft = document.getElementsByClassName('top-left')[0];
		   /* let topRight = document.getElementsByClassName('top-right')[0];
		    let bottomLeft = document.getElementsByClassName('bottom-left')[0];
		    let bottomRight = document.getElementsByClassName('bottom-right')[0];*/
			topLeft['style'].top = phase.detectionRoi.p1.y + 'px';
			topLeft['style'].left = phase.detectionRoi.p1.x + 'px';
			topLeft['style'].width = phase.detectionRoi.p2.x -phase.detectionRoi.p1.x + 'px';
			topLeft['style'].height = phase.detectionRoi.p3.y -phase.detectionRoi.p1.y + 'px';
			/*topRight['style'].top = phase.detectionRoi.p2.y+ 'px';
			topRight['style'].left = phase.detectionRoi.p2.x + -30 + 'px';


			bottomLeft['style'].top = phase.detectionRoi.p4.y +  -30 + 'px';
			bottomLeft['style'].left = phase.detectionRoi.p4.x + 'px';
			bottomRight['style'].top = phase.detectionRoi.p3.y +  -30 + 'px';
			bottomRight['style'].left = phase.detectionRoi.p3.x + -30 + 'px';*/
		  /*	
		  	this.roi = `1 1,${videoContainer.clientWidth} 1,${videoContainer.clientWidth} ${phase.detectionRoi.p1.y},${phase.detectionRoi.p1.x}  ${phase.detectionRoi.p1.y},${phase.detectionRoi.p4.x}  ${phase.detectionRoi.p4.y},${phase.detectionRoi.p3.x}  ${phase.detectionRoi.p3.y},${phase.detectionRoi.p2.x}  ${phase.detectionRoi.p2.y},${videoContainer.clientWidth} ${phase.detectionRoi.p1.y},${videoContainer.clientWidth} ${videoContainer.clientHeight},1 ${videoContainer.clientHeight},1 1`;

		  	let roiDiv = document.getElementById('roi') ;
		  	roiDiv.setAttribute('points', this.roi );*/		  	
		    console.log(phase.detectionRoi);
		};

		this.videoId.ui.onPhaseFinishing = ( (phase) => {
		    console.log("UI - Phase Finishing: ", phase);

		   /* this.detected(phase.coordinates);
		    setTimeout((()=>{
		    	let detectionDiv = document.getElementById('video-detection');
		    	let spinner = detectionDiv.getElementsByClassName('spinner');
    			spinner[0].classList.remove('active')
				let svg = detectionDiv.querySelector('svg');
		      	svg.querySelector('polygon').style.display = 'none';
		      	(svg.querySelector('animate') as HTMLElement).style.display = 'none';
		    }).bind(this), 900);*/
		    let videoDetection = document.getElementById('video-detection');
		    videoDetection.classList.add('flash');
		   	let background = document.createElement('div');
		   	background.id = "frame-Scan";
		   	videoDetection.appendChild(background);
			let canvas = document.getElementsByClassName('top-left')[0];    		      	
			canvas.classList.remove('color');  
			let divRoi = document.getElementById('animation-scanned');
  			let notification = document.getElementById('video-notification');
			notification.classList.remove("show");
  			divRoi.innerHTML = `			
						<div>
							<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
							
						</div>
  			`;
  			 setTimeout((()=>{
  			 	let canvas = document.getElementsByClassName('top-left')[0];      
	      		canvas.classList.remove('color');	      	
  			 	divRoi.classList.remove('hide')
		    	background.style.backgroundImage = 'url(' + phase.frame + ')';
		    }).bind(this),300);	
  			setTimeout((()=>{
		    	divRoi.classList.add('hide');
		    	background.classList.add('hide');
		    	videoDetection.classList.remove('flash');
		    	setTimeout((()=>{
    			    videoDetection.removeAttribute('style');  		      			
		    		divRoi.innerHTML = '';
		    		phase.continue();
		    	}).bind(this),600);		    	
		    }).bind(this), 4100);
		}).bind(this);

		this.videoId.ui.onPhaseFinished = function (phase) {
		    console.log("UI - Phase Finished: ", phase);
		    if(phase.name ===  'BACK') {
		    		let topLeft = document.getElementsByClassName('top-left')[0];
	    			topLeft.classList.add('face');
		    }
		};

		this.videoId.ui.onContextualHelp = ((phase) => {
		    console.log("UI - Show contextual help for phase: " + phase.name);
  			let help = document.querySelector('#help');
  			let evObj = document.createEvent('Events');
		    evObj.initEvent('click', true, false);
		    help.dispatchEvent(evObj);
		    phase.continue();
		}).bind(this);

		this.videoId.ui.onFaceDetectionAttempted = ((detection) => {
		    console.log("UI - Face Detection: ", detection);

		    if (detection.succeeded)

		        this.detected(detection.coordinates);
		}).bind(this);

		this.videoId.ui.onNotification = ((notification) => {

			this.showNotification(notification);
			this.speak(notification.message)
		    console.log("UI - Notification: ", notification);
		}).bind(this);
	}
}
