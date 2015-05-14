/* 
* @Author: Alex Pelletier
* @Date:   2015-05-13 09:07:55
* @Last Modified by:   Alex Pelletier
* @Last Modified time: 2015-05-14 09:46:40
*/

'use strict';

function PhysicsEngine (options) {
    this.objects = [];
    this.isRunning = false;
    this.count = 0;
    

    this.addObject = function(obj){
    	this.objects.push(obj);
    };

    this.start = function(){
    	this.isRunning = true;
    	console.log("Starting");
    	setTimeout(this.tic(), 500);
    };

    this.stop = function(){
    	console.log("Stopping");
    	this.isRunning = false;
    };

    this.tic = function(){
    	if (this.isRunning == true && this.count < 300){
    		for (var i = 0; i < this.objects.length; i++){
    			var obj = this.objects[i];
    			
       		}

    		this.count += 1;
    		setTimeout(this.tic(), 500);
    	}
    };
}