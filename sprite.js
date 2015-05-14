/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:39
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-14 09:46:38
*/

'use strict';

function sprite (options) {
				
    var this = {};
	
    //set options from initialization			
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.xStart = ("xStart" in options) ? options.xStart : 0;
    this.yStart = ("yStart" in options) ? options.yStart : 0;
    this.xVel = ("xVel" in options) ? options.xVel : 0;
    this.yVel = ("yVel" in options) ? options.yVel : 0;
    this.xAcc = ("xAcc" in options) ? options.xAcc : 0;
    this.yAcc = ("yAcc" in options) ? options.yAcc : 0;
    this.mass = ("mass" in options) ? options.mass : 10;
    this.gravity = ("gravity" in options) ? options.gravity : false;
    this.time = ("time" in options) ? options.time : false;
    this.x = 0;
    this.y = 0;

    if (this.gravity){
      this.yAcc -= 9.8;
    }

    //draw the sprite
    this.render = function () {
        this.context.drawImage(
           this.image,
           this.x,
           this.y,
           this.width,
           this.height);
    };

    return this;

}