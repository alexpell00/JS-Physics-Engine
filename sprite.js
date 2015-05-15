/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:39
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-15 11:08:29
*/

'use strict';



function sprite (options) {
				
    var that = {};
	
    //set options from initialization			
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.start = ("start" in options) ? options.start : point(0,0);
    that.vel = ("vel" in options) ? options.vel : point(0,0);
    that.acc = ("acc" in options) ? options.acc : point(0,0);
    that.mass = ("mass" in options) ? options.mass : 10;
    that.gravity = ("gravity" in options) ? options.gravity : false;
    that.time = ("time" in options) ? options.time : point(0,0);
    that.COR = ("COR" in options) ? options.COR : -0.75;
    that.type = "default"; 
    that.point = point(0,0);


    //start doing work with the presets
    if (that.gravity){
      that.acc.y += 9.8;
    }



    //draw the sprite
    that.render = function () {
        that.context.beginPath();
        that.context.arc(that.point.x,that.point.y,10,0,2*Math.PI);
        that.context.stroke();  
    };

    return that;

}

function OscillatingSprite(options){
  var that = sprite(options);

  that.max = ("max" in options) ? options.max : point(100,100);
  that.freq = ("freq" in options) ? options.freq : point(1,1);
  that.type = "oscillating";

  return that;
}

function point(x,y){
  return {
    x: x,
    y: y
  };
}