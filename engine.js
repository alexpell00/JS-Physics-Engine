/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:55
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-15 11:11:27
*/

'use strict';

function PhysicsEngine (options) {
    var that = {};

    that.objects = []
    that.isRunning = false;
    that.count = 0;
    that.canvas = options.canvas;
    that.fps = 30;
    that.timeModifier = 4;
    that.meterToPixel = 1;

    that.addObject = function(obj){
    	that.objects.push(obj);
    };

    that.start = function(){
    	that.isRunning = true;
    	console.log("Starting");
    	that.tic();
    };

    that.stop = function(){
    	console.log("Stopping");
    	that.isRunning = false;
    };

    that.tic = function(interval){ //runs every frame to update
    	if (that.isRunning == true && that.count < 300){
    		that.canvas.getContext("2d").clearRect ( 0 , 0 , that.canvas.width, that.canvas.height );
    		for (var i = 0; i < that.objects.length; i++){
    			var obj = that.objects[i];
    			obj.point = that.newPoint(obj);
    			obj.render();
       		}
    		that.count += 1;
    	}
    	setTimeout(function(){that.tic(interval+1);}, 1000/that.fps);
    };

    that.newPoint = function(obj){ //get new position of obj
    	var p = point(0,0);
    	if (obj.type == "default"){
    		//x = x_o + v_o*t + 1/2a*t^)2
    		p.x = this.meterToPixel*(obj.start.x + obj.vel.x*obj.time + 0.5*obj.acc.x*obj.time*obj.time); 
			p.y = this.meterToPixel*(obj.start.y + obj.vel.y*obj.time + 0.5*obj.acc.y*obj.time*obj.time);
    		console.log(p.y + "  " + (that.canvas.height-obj.height));
			if (p.y > that.canvas.height-obj.height){ // check for wall collision
				//hit on bottom
				obj.vel.y = that.calcVel(obj).y;
				obj.start.y = obj.point.y;
				obj.time = 0;
			}else if(p.x < 0`){
				obj.vel.x *= -1;
			}else{
				obj.time += that.timeModifier/that.fps;
			}
    	}else if (obj.type == "oscillating"){
    		// x = max*sin(freq*time+phi) + start + v_o*time
    		p.x = obj.max.x*Math.sin(obj.freq.x*obj.time) + obj.start.x + obj.vel.x*obj.time;
    		p.y = obj.max.y*Math.cos(obj.freq.y*obj.time) + obj.start.y + obj.vel.y*obj.time;
    		obj.time += that.timeModifier/that.fps;
    	}else{
    		console.log(obj);
    	}
    	return p;
    }

    that.calcVel = function(obj){
    	// v^2 = v_o^2 + 2a(x-x_o)
    	var vel = point(0,0);
    	vel.x = obj.COR*Math.sqrt(obj.vel.x*obj.vel.x+2*obj.acc.x*(obj.point.x-obj.start.x))
    	vel.y = obj.COR*Math.sqrt(obj.vel.y*obj.vel.y+2*obj.acc.y*(obj.point.y-obj.start.y))
    	return vel;
	}

    return that;
}


function point(x,y){
	return {
		x: x,
		y: y
	};
}
