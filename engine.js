/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:55
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-16 17:01:38
*/

'use strict';
Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});


function PhysicsEngine (options) {
    var that = {};

    that.objects = []
    that.isRunning = false;
    that.count = 0;
    that.canvas = options.canvas;
    that.fps = 100;
    that.timeModifier = 2;
    that.meterToPixel = 2;

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
    	if (that.isRunning == true && that.count < 100000){
    		that.canvas.getContext("2d").clearRect ( 0 , 0 , that.canvas.width, that.canvas.height );
    		for (var i = 0; i < that.objects.length; i++){
    			var obj = that.objects[i];
    			obj.point = that.newPoint(obj);
    			obj.render();
       		}
			//check for ball to ball collisions 
			for (var i = 0; i < that.objects.length; i++){  
			    for (var j = i + 1; j < that.objects.length; j++){  
			        if (that.isColliding(that.objects[i],that.objects[j])){
			            console.log("HIT");
			            that.resolveCollision(that.objects[i],that.objects[j]);
			        }
			    }
			}
    		that.count += 1;
    	}
    	setTimeout(function(){that.tic(interval+1);}, (1000/that.timeModifier)/that.fps);
    };

    that.newPoint = function(obj){ //get new position of obj
    	var p = point(0,0);
    	if (obj.type == "default"){
    		//x = x_o + v_o*t + 1/2a*t^)2
			obj.vel.x += obj.acc.x*(1/that.fps);
			obj.vel.y += obj.acc.y*(1/that.fps);
    		p.x = obj.point.x+this.meterToPixel*(obj.vel.x*(1/that.fps)); 
			p.y = obj.point.y+this.meterToPixel*(obj.vel.y*(1/that.fps));
    	}else if (obj.type == "oscillating"){
    		// x = max*sin(freq*time+phi) + start + v_o*time
    		p.x = obj.max.x*Math.sin(obj.freq.x*obj.time) + obj.start.x + obj.vel.x*obj.time;
    		p.y = obj.max.y*Math.cos(obj.freq.y*obj.time) + obj.start.y + obj.vel.y*obj.time;
    		obj.time += that.timeModifier/that.fps;
    	}else{
    		console.log(obj);
    	}
    	obj.keepInBounds(p);
    	return p;
    };

    that.calcVel = function(obj){
    	// v^2 = v_o^2 + 2a(x-x_o)
    	var vel = point(0,0);
    	vel.x = Math.sqrt(obj.vel.x*obj.vel.x+2*obj.acc.x*(obj.point.x-obj.start.x))
    	vel.y = Math.sqrt(obj.vel.y*obj.vel.y+2*obj.acc.y*(obj.point.y-obj.start.y))
    	return vel;
	};

	//help from http://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
	that.isColliding = function(sprite1, sprite2){
		var xd =  sprite1.point.x - sprite2.point.x;
	    var yd =  sprite1.point.y - sprite2.point.y;

	    var sumRadius = sprite1.width + sprite2.width;
	    var sqrRadius = sumRadius * sumRadius;

	    var distSqr = (xd * xd) + (yd * yd);

	    if (distSqr <= sqrRadius){
	        return true;
	    }

	    return false;
	};

	//help from http://codepen.io/anon/pen/xGObLd
	that.resolveCollision = function(sprite1, sprite2){
		var θ1, θ2,

	      /* the normal segment */
	      ns = new Segment(sprite1.point, sprite2.point),

	      /* contact point */
	      cp = {
	        'x': μ([sprite1.point.x, sprite2.point.x], [sprite2.width, sprite1.width]),
	        'y': μ([sprite1.point.y, sprite2.point.y], [sprite2.width, sprite1.width])
	      };

	    sprite1.cs = {
	      'x': σ(cp.x - sprite1.point.x),
	      'y': σ(cp.y - sprite1.point.y)
	    };
	    sprite2.cs = {
	      'x': σ(cp.x - sprite2.point.x),
	      'y': σ(cp.y - sprite2.point.y)
	    };

	    sprite1.point = {
	      'x': cp.x -
	        sprite1.cs.x * sprite1.width * abs(cos(ns.α)),
	      'y': cp.y -
	        sprite1.cs.y * sprite1.width * abs(sin(ns.α))
	    };
	    sprite2.point = {
	      'x': cp.x - sprite2.cs.x * sprite2.width * abs(cos(ns.α)),
	      'y': cp.y - sprite2.cs.y * sprite2.width * abs(sin(ns.α))
	    };

	    sprite1.vel.α = Math.atan2(sprite1.vel.y, sprite1.vel.x);
	    sprite2.vel.α = Math.atan2(sprite2.vel.y, sprite2.vel.x);

	    sprite1.vel.val = hypot(sprite1.vel.y, sprite1.vel.x);
	    sprite2.vel.val = hypot(sprite2.vel.y, sprite2.vel.x);

	    θ1 = ns.α - sprite1.vel.α;
	    θ2 = ns.α - sprite2.vel.α;

	    sprite1.vel.α -= PI - 2 * θ1;
	    sprite2.vel.α -= PI - 2 * θ2;

	    sprite1.vel.x = sprite1.vel.val * cos(sprite1.vel.α);
	    sprite1.vel.y = sprite1.vel.val * sin(sprite1.vel.α);

	    sprite2.vel.x = sprite2.vel.val * cos(sprite2.vel.α);
	    sprite2.vel.y = sprite2.vel.val * sin(sprite2.vel.α);

	};

	//UTIL
	var Segment = function(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
		this.α = null;

		this.init = function() {
			if (!this.p1) {
			  this.p1 = {
			    'x': rand(w, 0, 1),
			    'y': rand(h, 0, 1)
			  };
			}

			if (!this.p2) {
			  this.p2 = {
			    'x': rand(w, 0, 1),
			    'y': rand(h, 0, 1)
			  };
			}

			this.α = Math.atan2(this.p2.y - this.p1.y,
			  this.p2.x - this.p1.x);
		};
		this.init();
	};

	var σ = function(n) {
		return n / abs(n);
	};

	var μ = function(values, weights) {
		var n = Math.min(values.length, weights.length),
			num = 0,
			den = 0;

		for (var i = 0; i < n; i++) {
			num += weights[i] * values[i];
			den += weights[i];
		}

		return num / den;
	};

	var hypot = function(x, y) {
		return sqrt(pow(x, 2) + pow(y, 2));
	};

    return that;
}


function point(x,y){
	return {
		x: x,
		y: y
	};
}
