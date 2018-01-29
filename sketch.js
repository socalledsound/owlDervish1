let eyeRadius = 100;
let colors = [[180,20,180],[20,120,200],[170,80,80],[120,100,200],[20,120,200],[170,80,80],[120,100,200]];
let arcs1 = [];
let arcs2 = [];
let numArcs = 5;
let arcLength = 360/numArcs;
let diameter = 90;
let tempo = 500;
let xoff = 0;
let inc = 0.5;

let img;
let imgPath="AS-body-1.png"

let rightBiceps = [];
let leftBiceps = [];
let numBiceps  = 4;
let startingRightXvals = [600,625,650,600];
let startingRightYvals = [350,400,475,500];
let endingRightXvals = [800,900,700,720];
let endingRightYvals = [200,400,500,700];

let startingRightXvals = [600,625,650,600];
let startingRightYvals = [350,400,475,500];
let endingRightXvals = [800,900,700,720];
let endingRightYvals = [200,400,500,700];




function preload() {
  img = loadImage(imgPath);
}

function setup() {
  createCanvas(1000,800);
  frameRate(25);
  noStroke();

 for(let i=0; i<numArcs; i++) {
   console.log("begin arcLegnth:"+arcLength);
 arcs1[i] = new Arc(width/2-80,280, diameter, radians(i*arcLength), radians(arcLength+(i*arcLength)), colors[i%4]);
    arcs1[i].turnOff();
    arcs2[i] = new Arc(width/2+80,280, diameter, radians(i*arcLength), radians(arcLength+(i*arcLength)), colors[i%4]);
     arcs2[i].turnOff();
 };


 for (let j=0; j< numBiceps; j++ ) {
	//  let thisStartingX = 500+(j*25);
	//  let thisStartingY = 200+(j*30);
	//thisStartingX,thisStartingY,thisStartingX+random(80,200),thisStartingY+random(-30,30)
	 rightBiceps[j] = new ScreenSideRightArm(startingRightXvals[j],startingRightYvals[j],endingRightXvals[j],endingRightYvals[j]);
	 lefttBiceps[j] = new ScreenSideRightArm(startingLeftXvals[j],startingLeftYvals[j],endingLeftXvals[j],endingLeftYvals[j]);
 }


setInterval(fullEyes, tempo);

}

function draw() {
background(0);

image(img,width/2-150,height/2-40,300,300);
trigArc();

stroke(255);
strokeWeight(10);
fill(200,0,200);

//left arm bicep
curve(400,800,360,380,220,375,0,600);
curve(600,0,340,400,225,385,100,0);

//left arm tricep
curve(0,400,220,360,210,210,0,20);
curve(500,600,205,360,195,210,400,100);

//left arm hand
// line(195,200,170,200);
// line(195,185,160,185);
// line(195,170,150,170);



//right arm bicep
// 660,380,800,330
// 640,400,825,345
// so lets say we have an arm starting center point of 650,390
//and ending center point of 810,340
// then we could do something like 

rightBiceps.forEach(function(arm){
	arm.display();
},this);
// curve(500,800,660,380,800,330,1000,600);
// curve(200,0,640,400,825,345,800,0);

//right arm tricep
//  curve(1000,800,800,330,820,210,200,1000);
//  curve(600,1000,820,330,840,195,800,0);



}




let ScreenSideRightArm = function(startingX,startingY,endingX,endingY) {

	this.startingX = startingX;
	this.startingY = startingY;
	this.endingX = endingX;
	this.endingY = endingY;


	this.display = function() {
		stroke(255);
		strokeWeight(10);
		fill(200,0,200);
		curve(random(0,500),random(600,1000),this.startingX+random(-10,10), this.startingY-10, this.endingX+random(-10,10), this.endingY-10,random(600,1000),random(800,1000));
		curve(random(0,400),random(0,200), this.startingX+random(-10,10), this.startingY+10, this.endingX+random(-10,10), this.endingY+10,random(700,1000),random(0,100));


	}


}




let Arc = function (x,y,diameter,start_arc,end_arc) {
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.centerD = diameter/5;
	this.start_arc = start_arc;
	this.end_arc = end_arc;
	this.onColor = [int(random(100,255)),int(random(100,255)),int(random(100,255))];
	// this.onColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.offColor = 0;
	this.centerCircleFill = [200,0,200];
	this.clicked = false;

	this.turnOn = function() {

		console.log("in here");
	  	fill(this.onColor);
 	  	arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
 	  	fill(this.centerCircleFill);
 	  	ellipse(this.x, this.y, this.centerD);
 	  	fill(this.centerCircleFill);
 	  	ellipse(this.x, this.y, this.centerD);
 	  	setTimeout(this.turnOff,tempo/2);
	},

	this.turnOff = function(){
		fill(this.offColor);
 	  	arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
 	  	fill(this.centerCircleFill);
 	  	ellipse(this.x, this.y, this.centerD);
 	  	fill(this.centerCircleFill);
 	  	ellipse(this.x, this.y, this.centerD);
	}

	this.turnOff = this.turnOff.bind(this);

}


function trigArc(noiseVal) {
	xoff += inc;
	 var x = map(noise(xoff), 0, 1, 0, numArcs);
	 var lightNum = int(random(numArcs))
	   
	   for (let i=0; i < lightNum; i ++) {
		   //arcs1[int(x)].turnOn();
		   arcs1[int(random(numArcs))].turnOn();
		   arcs2[int(random(numArcs))].turnOn();
	   }
   }


function fullEyes(){
	arcs1.forEach(function(arc){
		arc.turnOn();
	},this);
	
	arcs2.forEach(function(arc){
		arc.turnOn();
	},this);
	}
	
	function getRad () {
	
		var deltaX = (width/2 - mouseX);
		var deltaY = (height/2 - mouseY);
	
		// In radians
		var rad =  Math.atan2(deltaY, deltaX) + Math.PI;
		// var deg = Math.round(rad * (180 / Math.PI)) //In degrees
		// console.log(degrees(rad));
		return rad
	}
	