(function(){
	var cubeList = [];

	var TRIGGER_CONTROLS = [
		Controller.Standard.LT,
		Controller.Standard.RT,
	];

	var hand;
	var _this;

	var drawLine = function (startPos, endPos) {
		var id = Entities.addEntity({
			position: startPos,
			type: "Box",
			name: "LineBox",
			color: { red: 0, green: 255, blue: 155 }
		});
		print("step 4");
	};

	function CubeSpawner(){};
	print("step 1");

	CubeSpawner.prototype = {
	    preload: function(entityID){
	        _this = this;
	        _this.entityID = entityID;
	        this.entityID = entityID;
	        print("step 2");
	        _this.lineManager = LineManager();
	    },
	    startEquip: function(entityID, args){
	        print("Equipping");
	        hand = args[0] == "left" ? 0:1;
	    },
	    continueEquip: function(entityID, args){
	        if(Controller.getValue(TRIGGER_CONTROLS[hand]) > .95)
	        {
	        	var cubePosition = frontPosition();
	        	print("step 3");
	            drawLine(cubePosition, cubePosition);
	        }
	    }
	};

	var spawnACube = function(){
		var cubePosition = frontPosition();
		var id = Entities.addEntity({
			position: cubePosition,
			"script": Script.resolvePath("cube.js") ,
			type: "Box",
			name: "ScriptBox",
			color: { red: 0, green: 0, blue: 155 }
		});
	    print("Made a cube!" , id);
	    cubeList.push(id);
	};

	var frontPosition = function(){
	    var position = Entities.getEntityProperties(_this.entityID).position;
	    var rotation = Entities.getEntityProperties(_this.entityID).rotation;

	    var front = Quat.getFront(rotation);
	    var offset = Vec3.multiply(front, 0.25);

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