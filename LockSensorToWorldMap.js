(function(){
	print("Top of new spawn cube");

	var hand;
	var _this = this;
	var target;

	_this.clickDownOnEntity = function(entityID, event){
        print("I was clicked!");
        changeColor(entityID);
    }
    var changeColor = function(entityID){       
        var newRed = Math.random()*255;
        var newGreen = Math.random()*255;
        var newBlue = Math.random()*255;

        var newProperty = { color: {red: newRed, green: newGreen, blue: newBlue}};
        Entities.editEntity(entityID, newProperty);
    }

    var lockWorldTransform = function(entityID){
    	target = MyAvatar.getSensorToWorldMatrix();

    }

    var fixWorldTransform = function(entityID){
    	var currentPos = MyAvatar.getHeadPosition();
    	var up = {"x": 0, "y":1.0, "z":0};
    	MyAvatar.goToLocation(Vec3.sum(currentPos, up), false);
    }

	function Locker(){};

	Locker.prototype = {
	    preload: function(entityID){
	    	
	    },
	    clickDownOnEntity: function(entityID, event){
	        print("I was clicked by the mouse!");
	        changeColor(entityID);
	    },
	    startFarTrigger: function(entityID){
	    	print("I was clicked in VR!");
	    	fixWorldTransform();
	        changeColor(entityID);
	    },
	    startNearTrigger: function(entityID){
	    	print("I was clicked in VR!");
	    	fixWorldTransform();
	        changeColor(entityID);
	    }
	};

	var someFunction = function(){
	    
	}

	return new Locker();
});
