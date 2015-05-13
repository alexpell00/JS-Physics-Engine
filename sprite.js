/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:39
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-13 09:34:37
*/

'use strict';

function sprite (options) {
				
    var that = {};
	
	//set options from initialization			
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.x = 0;
    that.y = 0;
    that.xVel = 0;
    that.yVel = 0;
    that.xAcc = 0;
    that.yAcc = 0;
    that.mass = 10;
    that.gravity = 9.8;
    

    //draw the sprite
    that.render = function () {
        that.context.drawImage(
           that.image,
           that.x,
           that.y,
           that.width,
           that.height);
    };

    return that;

}