(function(){
	var TRIGGER_CONTROLS = [
		Controller.Standard.LT,
		Controller.Standard.RT,
	];

	var hand;
	var _this;

	function withinRealBox(position, rotation, dimensions, point) {
		// 
	};

	function Eraser(){};

	Eraser.prototype = {
	    preload: function(entityID){
	        _this = this;
	        _this.entityID = entityID;
	        this.entityID = entityID;
	    },
	    startEquip: function(entityID, args){
	        hand = args[0] == "left" ? 0:1;
	    },
	    continueEquip: function(entityID, args){
	    	var triggerPressed = Controller.getValue(TRIGGER_CONTROLS[hand]) > .95;
	        if(triggerPressed) {
	        	// erase things.
	        	var properties = Entities.getEntityProperties(this.entityID, ["boundingBox", "position", "rotation"]);
	        	var nearbyItems = Entities.findEntitiesInBox(properties.boundingBox.brn, properties.boundingBox.dimensions);

	        	nearbyItems.forEach(function(elem) {
	        		var elemProperties = Entities.getEntityProperties(elem, ["userData"]);
	        		properties = JSON.parse(elemProperties.userData);
	        		if (properties.eraseable) {
	        			Entities.deleteEntity(elem)
	        		}
	        	});
	        }
	    }
	};

	return new Eraser();
});