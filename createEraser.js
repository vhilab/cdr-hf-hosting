Entities.addEntity({
    position: Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation)),
    "script": Script.resolvePath("Eraser.js") ,
    type: "Box",
    color: { red: 255, green: 255, blue: 255 },
    dimensions: { x: .1, y: .05, z: .02 },
    name: "Eraser",
    "userData": JSON.stringify({
    	"grabbableKey" : { "wantsTrigger" : true },
    	"wearable" : {
    		"joints" : {
    			"RightHand" : [ {
    				"x": 0.0813,
    				"y": 0.0452,
    				"z": 0.0095
    			}, {
    				"x": -0.3946,
    				"y": -0.6604,
    				"z": 0.4748,
    				"w": -0.4275
    			} ],
    			"LeftHand" : [ {
    				"x": -0.0881,
    				"y": 0.0259,
    				"z": 0.0159
    			}, {
    				"x": 0.4427,
    				"y": -0.6519,
    				"z": 0.4592,
    				"w": 0.4099
    			} ]
    		}
    	}
    })
});