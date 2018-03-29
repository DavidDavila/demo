import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: '[biometrics]',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.scss']
})
export class BiometricsComponent implements OnInit {

	@Input() photo: string;
	@Input() points: any;
	public width: number;
	public height: number;
	public htmlLines: Array<any> = []; 
	public htmlPoints: Array<any> = []; 
	public newLines: Array<any> = []
	public lines: Array<Array<any>> = [];
	public pointsNumber:Array<number> = [ 8, 48, 54, 35, 31 , 30, 27, 21, 22, 26, 17 ];
  constructor() { 

	}
  ngOnInit() {  	
  }
  ngOnChanges(changes: any) {
  	if( changes.photo ){
	  	let tempImage1 = new Image();
			tempImage1.src = 'data:image/jpg;base64,' + changes.photo.currentValue;
			tempImage1.onload = () => {
				this.width = window.innerHeight * 0.14;
				this.height = window.innerHeight * 0.14;
				this.htmlLines = [];
				if( this.points ) {
					this.setLines();
					this.getLines();				
				}
			}  		
  	}
  	if( changes.points) {
      this.htmlPoints = [];
  		this.pointsToShow();
  	}
  }
  pointsToShow() {
  	for (var i = 0; i < this.pointsNumber.length; i++) {
  		this.htmlPoints.push(this.points[this.pointsNumber[i]]);
  	}
  }
  setLines() {
  	this.newLines = [
		{
			x: this.points[45].x,
			y: this.points[51].y
		}, 
		{
			x: this.points[36].x,
			y: this.points[51].y
		},

	]
	this.lines = [
	/*		[ 8, 48 ],
			[ 8, 54 ],
			[ 31, 48 ],
			[ 35, 54 ],
			[ 30, 35 ],
			[ 30, 31 ],
			[ 21, 30 ],
			[ 22, 30 ],
			[ 21, 27 ],
			[ 22, 27 ],
			[ 17, 21 ],
			[ 22, 26 ],
			[ 21, 22 ],
			[ 48, 	{
					x: this.points[39].x,
					y: this.points[29].y
				}, 
			],
			[ 27, 	{
					x: this.points[39].x,
					y: this.points[29].y
				}, 
			],
*/


  	[ 7, 8 ],
  	[ 8, 9 ],
  	[ 7, 57 ],
  	[ 8, 57 ],
  	[ 9, 57 ],
  	[ 9, 54 ],
  	[ 54, 57 ],
  	[ 7, 48 ],
  	[ 48, 57 ],
  	[ 48, 51 ],
  	[ 51, 54 ],
  	[ 51, 31 ],
  	[ 51, 35 ],
  	[ 31, 33 ],
  	[ 33, 35 ],
  	[ 35, 42 ],
  	[ 31, 39 ],
  	[ 27, 39 ],
  	[ 35, 54 ],
  	[ 31, 48 ],
  	[ 21, 39 ],
  	[ 22, 42],
  	[ 35, 45 ],
  	[ 15, 45 ],
  	[ 9, 12 ],
  	[ 22, 23 ],
  	[ 23, 24 ],
  	[ 24, 25 ],
  	[ 25, 26 ],
  	
  	[ 21, 27 ],
  	[ 22, 27 ],
  	[ 27, 42 ],
  	[ 30, 31 ],
  	[ 30, 35 ],
  	[ 27, 28 ],
  	[ 28, 29 ],
  	[ 29, 30 ],
  	[ 26, 45 ],
  	[ 15, 26 ],
  	[ 22, 43 ],
  	[ 15, this.newLines[0] ],
  	[ 54, this.newLines[0] ],
  	[ 12, this.newLines[0] ],
  	[ 35,  this.newLines[0] ],
  	[ 4, 7 ],
  	
  	[ 42, 47 ],
		[ 42, 43 ],
		[ 43, 44 ],	
		[ 44, 45 ],
  	[ 45, 46 ],
  	[ 46, 47 ],
	
  	[ 36, 37 ],
  	[ 36, 41 ],
  	[ 37, 38 ],
  	[ 38, 39 ],
  	[ 39, 40 ],
  	[ 40, 41 ],

  	[ 21, 38 ],
  	[ 17, 18 ],
  	[ 18, 19 ],
  	[ 19, 20 ],
  	[ 20, 21 ],
  	[ 17, 36 ],
  	[ 1, 36 ],
  	[ 1, 17 ],
  	[ 31, 36 ],
  	[ 1, this.newLines[1] ],
  	[ 4, this.newLines[1] ],
  	[ 31, this.newLines[1] ],
  	[ 48,  this.newLines[1] ],
  ]
  }
  getLines(){
  	for (let i = 0; i < this.lines.length; i++) {
  		if( this.points[this.lines[i][1]]  && this.points[this.lines[i][0]] ) {
	  		this.htmlLines.push({
	  			x1: this.points[this.lines[i][0]].x  * 150 / this.width,
	  			y1: this.points[this.lines[i][0]].y  * 150 / this.height,
	  			x2: this.points[this.lines[i][1]].x  * 150 / this.width,
	  			y2: this.points[this.lines[i][1]].y  * 150 / this.height,
	  		});
	  	} else {
	  		this.htmlLines.push({
	  			x1: this.points[this.lines[i][0]].x  * 150 / this.width,
	  			y1: this.points[this.lines[i][0]].y  * 150 / this.height,
	  			x2: this.lines[i][1].x  * 150 / this.width,
	  			y2: this.lines[i][1].y  * 150 / this.height,
	  		});
	  	}
  	}
  }

}