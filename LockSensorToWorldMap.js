(function(){
	print("Top of new spawn cube");

	var hand;
	var _this = this;

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
    	Mat4.print("sensor2world", MyAvatar.getSensorToWorldMatrix());
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
	    	lockWorldTransform();
	        changeColor(entityID);
	    },
	    startNearTrigger: function(entityID){
	    	print("I was clicked in VR!");
	    	lockWorldTransform();
	        changeColor(entityID);
	    }
	};

	var someFunction = function(){
	    
	}

	return new Locker();
});