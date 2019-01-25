(function(){
	print("Top of new spawn cube");
	var cubeList = [];

	var TRIGGER_CONTROLS = [
		Controller.Standard.LT,
		Controller.Standard.RT,
	];

	var hand;
	var _this;

	function CubeSpawner(){};

	var drawLine = function (startPos, endPos) {
		print("[jbaef] Drawing line!");

		var radius = 0.005;
		var distance = Vec3.distance(startPos, endPos);
		var center = Vec3.mix(startPos, endPos, 0.5);
		var tilt = Quat.rotationBetween(
			{x:0, y:distance, z:0},
			Vec3.subtract(endPos, startPos)
		);

		var shape = Entities.addEntity({
			type: "Shape",
			shape: "Cube",
			position: center,
			rotation: tilt,
			dimensions: { x: radius, y: distance + 2 * radius, z: radius },
			color: { red: 0, green: 0, blue: 127 },
			lifetime: 3600, // delete after one hour
			collisionless: true,
			"userData": "\{\"eraseable\" : true\}"
		});

		/* commenting out the shpere
		var shape = Entities.addEntity({
			type: "Shape",
			shape: "Sphere",
			position: endPos,
			dimensions: { x: radius, y: radius, z: radius },
			color: { red: 0, green: 0, blue: 127 },
			lifetime: 3600, // Delete after one hour
			collisionless: true,
			"userData": "\{\"eraseable\" : true\}",
		});
		*/

		/*
		// startPos shape
		var shape = Entities.addEntity({
			type: "Shape",
			shape: "Sphere",
			position: startPos,
			dimensions: { x: radius, y: radius, z: radius },
			lifetime: 30, // Delete after 30 seconds.
			"userData": "\{\"eraseable\" : true\}",
			color: { red: 0, green: 255, blue: 0}
		});

		// endPos shape
		var shape = Entities.addEntity({
			type: "Shape",
			shape: "Sphere",
			position: endPos,
			dimensions: { x: radius, y: radius, z: radius },
			lifetime: 30, // Delete after 30 seconds.
			"userData": "\{\"eraseable\" : true\}",
			color: { red: 255, green: 0, blue: 0}
		});

		// center shape
		var shape = Entities.addEntity({
			type: "Shape",
			shape: "Sphere",
			position: center,
			dimensions: { x: 0.03, y: 0.03, z: 0.03 },
			lifetime: 30, // Delete after 30 seconds.
			"userData": "\{\"eraseable\" : true\}",
			color: { red: 255, green: 255, blue: 0}
		});
		*/
	};

	CubeSpawner.prototype = {
	    preload: function(entityID){
	    	print("[blfsa] Preloading!")
	        _this = this;
	        _this.entityID = entityID;
	        this.entityID = entityID;
	        this.prevStepMarkerPosition = null;
	        print("[lkags] prevStepMarkerPosition:");
	        print(this.prevStepMarkerPosition);
	    },
	    startEquip: function(entityID, args){
	        print("Equipping");
	        hand = args[0] == "left" ? 0:1;
	    },
	    continueEquip: function(entityID, args){
	    	var triggerPressed = Controller.getValue(TRIGGER_CONTROLS[hand]) > .95;
	        if(triggerPressed) {
	        	var cubePosition = frontPosition();
	        	if (this.prevStepMarkerPosition !== null) {
	        		drawLine(this.prevStepMarkerPosition, cubePosition);
	        	}
	        	this.prevStepMarkerPosition = cubePosition;
	        } else {
	        	this.prevStepMarkerPosition = null;
	        }
	    }
	};

	var frontPosition = function(){
	    var position = Entities.getEntityProperties(_this.entityID).position;
	    var rotation = Entities.getEntityProperties(_this.entityID).rotation;

	    var front = Quat.getFront(rotation);
	    var offset = Vec3.multiply(front, -0.075);

	    return Vec3.sum(position, offset);
	}

	var deleteAllCubes = function(){
	    while(cubeList.length > 0)
	        {
	            Entities.deleteEntity(cubeList.pop());
	        }
	}

	Entities.deletingEntity.connect(deleteAllCubes);

	return new CubeSpawner();
});
