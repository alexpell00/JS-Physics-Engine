/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:39
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-15 17:41:08
*/

'use strict';



function sprite (options) {
				
    var that = {};
	
    //set options from initialization			
    that.canvas = options.canvas;
    that.width = options.width;
    that.height = options.height;
    that.start = ("start" in options) ? options.start : point(0,0);
    that.vel = ("vel" in options) ? options.vel : point(0,0);
    that.acc = ("acc" in options) ? options.acc : point(0,0);
    that.mass = ("mass" in options) ? options.mass : 10;
    that.gravity = ("gravity" in options) ? options.gravity : false;
    that.time = ("time" in options) ? options.time : 0;
    that.COR = ("COR" in options) ? options.COR : -0.75;
    that.type = "default"; 
    that.point = ("start" in options) ? options.start : point(0,0);

    //start doing work with the presets
    if (that.gravity){
      that.acc.y += 9.8;
    }

    if (that.COR > 0){
      that.COR *= -1;
    }

    //draw the sprite
    that.render = function () {
      if (that.canvas){
        that.canvas.getContext("2d").beginPath();
        that.canvas.getContext("2d").arc(that.point.x,that.point.y,that.width,0,2*Math.PI);
        that.canvas.getContext("2d").stroke();  
      }
    };

    that.keepInBounds = function(p){
      if (p.y > that.canvas.height-that.height || p.y < 0){
        that.vel.y *= that.COR;
      }else if(p.x < 0 || p.x > that.canvas.width-that.width){
        that.vel.x *= that.COR;
      }else{
        that.time += that.timeModifier/that.fps;
      }
    };

    return that;

}

function OscillatingSprite(options){
  var that = sprite(options);

  that.max = ("max" in options) ? options.max : point(100,100);
  that.freq = ("freq" in options) ? options.freq : point(1,1);
  that.type = "oscillating";

  that.keepInBounds = function(p){
    if(p.x < 0 || p.x > that.canvas.width-that.width){
      that.vel.x *= -1;
      that.time = 0;
      that.start = that.point;
    }
  }
  return that;
}

function point(x,y){
  return {
    x: x,
    y: y
  };
}