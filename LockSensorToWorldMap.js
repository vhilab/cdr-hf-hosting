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
    	if (target == undefined) {
    		print("target is undefined, locking instead.");
    		lockWorldTransform(entityID);
    	} else {
    		print("target is defined.");
    		var current_inverse = Mat4.inverse(MyAvatar.getSensorToWorldMatrix());
    		var currentPos = MyAvatar.getHeadPosition();
	    	var translation = Mat4.extractTranslation(Mat4.mul(target, current_inverse));
	    	MyAvatar.goToLocation(Vec3.sum(currentPos, translation), false);
    	}
    	
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
