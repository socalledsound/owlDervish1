let eyeRadius = 100;
let colors = [[180,20,180],[20,120,200],[170,80,80],[120,100,200],[20,120,200],[170,80,80],[120,100,200]];
let arcs1 = [];
let arcs2 = [];
let numArcs = 5;
let arcLength = 360/numArcs;
let diameter = 200;
let tempo = 500;
let xoff = 0;
let inc = 0.5;

let img;
let imgPath="AS-body-1.png"

let rightBiceps = [];
let leftBiceps = [];
let numBiceps  = 4;
let armRadiusMax = 600;
let theta = 0;
let angles = [89,90.3,89.5,88.2];
let startingRightXval = 600;
let startingRightYval = 400;
//let endingRightXvals = [800,900,700,720];
//let endingRightYvals = [200,400,500,700];

let startingLeftXval= 400;
let startingLeftYval = 400;
//let endingLeftXvals = [800,900,700,720];
//let endingLeftYvals = [200,400,500,700];




function preload() {
  img = loadImage(imgPath);
}

function setup() {
  createCanvas(1000,800);
  frameRate(25);
  noStroke();

 for(let i=0; i<numArcs; i++) {
//   console.log("begin arcLegnth:"+arcLength);
 arcs1[i] = new Arc(width/2-80,280, diameter, radians(i*arcLength), radians(arcLength+(i*arcLength)), colors[i%4]);
    arcs1[i].turnOff();
    arcs2[i] = new Arc(width/2+80,280, diameter, radians(i*arcLength), radians(arcLength+(i*arcLength)), colors[i%4]);
     arcs2[i].turnOff();
 };


 for (let j=0; j< numBiceps; j++ ) {
	//  let thisStartingX = 500+(j*25);
	//  let thisStartingY = 200+(j*30);
	//thisStartingX,thisStartingY,thisStartingX+random(80,200),thisStartingY+random(-30,30)
	 rightBiceps[j] = new ScreenSideRightArm(startingRightXval,startingRightYval,armRadiusMax,angles[j]);
	 leftBiceps[j] = new ScreenSideLeftArm(startingLeftXval,startingLeftYval,armRadiusMax,angles[j]*-1);
 }


setInterval(fullEyes, tempo);

}

function draw() {
background(0);




stroke(255);
strokeWeight(10);
fill(200,0,200);


for (let a=0;a<angles.length;a++) {
    
    angles[a]+=0.1;
}  
    
    
rightBiceps.forEach(function(arm,index){
    arm.update(angles[index]);
	arm.display();
},this);
    
    
leftBiceps.forEach(function(arm,index){
    arm.update(angles[index]);
	arm.display();
},this);    
    


image(img,width/2-150,height/2-40,300,300);
trigArc();
}




let ScreenSideRightArm = function(startingX,startingY,armRadiusMax,theta) {

	this.armRadius = random(armRadiusMax/2,armRadiusMax); 
    
    this.startingX_c1 = startingX + random(-10,10);
	this.startingY_c1 = startingY - 10;
	this.endingX_c1 = this.startingX_c1 + random(-10,10) + this.armRadius*sin(theta);
	this.endingY_c1 = this.startingY_c1 + this.armRadius * cos(theta)- random(-5,5);
    
    this.curveControl_c1x1 = this.startingX_c1 - random(50,100);
    this.curveControl_c1y1 = this.startingY_c1 + random(100,300);
    this.curveControl_c1x2 = this.endingX_c1 +random(100,200);
    this.curveControl_c1y2 = this.endingY_c1 +random(200,400); 
    
    this.startingX_c2 = startingX+random(-10,10);
	this.startingY_c2 = startingY+10;
	this.endingX_c2 = this.startingX_c2 +random(-10,10)+this.armRadius*sin(theta);
	this.endingY_c2 = this.startingY_c2 +this.armRadius*cos(theta)+10;
    
    this.curveControl_c2x1 = this.startingX_c2 -random(100,200);
    this.curveControl_c2y1 = this.startingY_c2 -random(200,400);
    this.curveControl_c2x2 = this.endingX_c2 +random(100,200);
    this.curveControl_c2y2 = this.endingY_c2 -random(100,200); 
    

    this.update = function(theta) {
        this.endingX_c1 = this.startingX_c1 + this.armRadius*sin(theta*-1);
        this.endingY_c1 = this.startingY_c1 + this.armRadius*cos(theta*-1);
        this.endingX_c2 = this.startingX_c2 + this.armRadius*sin(theta*-1);
        this.endingY_c2 = this.startingY_c2 + this.armRadius*cos(theta*-1);
    }

	this.display = function() {
		stroke(255);
		strokeWeight(10);
		fill(200,0,200);
        
		curve(
                this.curveControl_c1x1, this.curveControl_c1y1, 
                this.startingX_c1, this.startingY_c1, 
                this.endingX_c1, this.endingY_c1, this.curveControl_c1x2,this.curveControl_c1y2
             );
        
		curve(
                this.curveControl_c2x1,this.curveControl_c2y1, 
                this.startingX_c2, this.startingY_c2, 
                this.endingX_c2, this.endingY_c2,
                this.curveControl_c2x2,this.curveControl_c2y2
            );


	}


}


let ScreenSideLeftArm = function(startingX,startingY,armRadiusMax,theta) {

	this.armRadius = random(armRadiusMax/2,armRadiusMax); 
    
    this.startingX_c1 = startingX + random(-10,10);
	this.startingY_c1 = startingY - 10;
	this.endingX_c1 = this.startingX_c1 + random(-10,10) + this.armRadius*sin(theta);
	this.endingY_c1 = this.startingY_c1 + this.armRadius * cos(theta)- random(-5,5);
    
    this.curveControl_c1x1 = this.startingX_c1 - random(50,100);
    this.curveControl_c1y1 = this.startingY_c1 + random(100,300);
    this.curveControl_c1x2 = this.endingX_c1 +random(100,200);
    this.curveControl_c1y2 = this.endingY_c1 +random(200,400); 
    
    this.startingX_c2 = startingX+random(-10,10);
	this.startingY_c2 = startingY+10;
	this.endingX_c2 = this.startingX_c2 +random(-10,10)+this.armRadius*sin(theta);
	this.endingY_c2 = this.startingY_c2 +this.armRadius*cos(theta)+10;
    
    this.curveControl_c2x1 = this.startingX_c2 -random(100,200);
    this.curveControl_c2y1 = this.startingY_c2 -random(200,400);
    this.curveControl_c2x2 = this.endingX_c2 +random(100,200);
    this.curveControl_c2y2 = this.endingY_c2 -random(100,200); 
    

    this.update = function(theta) {
        this.endingX_c1 = this.startingX_c1 + this.armRadius*sin(theta);
        this.endingY_c1 = this.startingY_c1 + this.armRadius*cos(theta);
        this.endingX_c2 = this.startingX_c2 + this.armRadius*sin(theta);
        this.endingY_c2 = this.startingY_c2 + this.armRadius*cos(theta);
    }

	this.display = function() {
		stroke(255);
		strokeWeight(10);
		fill(200,0,200);
        
		curve(
                this.curveControl_c1x1, this.curveControl_c1y1, 
                this.startingX_c1, this.startingY_c1, 
                this.endingX_c1, this.endingY_c1, this.curveControl_c1x2,this.curveControl_c1y2
             );
        
		curve(
                this.curveControl_c2x1,this.curveControl_c2y1, 
                this.startingX_c2, this.startingY_c2, 
                this.endingX_c2, this.endingY_c2,
                this.curveControl_c2x2,this.curveControl_c2y2
            );


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
	