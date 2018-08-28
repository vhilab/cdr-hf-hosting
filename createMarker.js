//var rightOrientation = {"x": -0.3946, "y": -0.6604, "z": 0.4748, "w": -0.4275};
//var leftOrientation = {"x": 0.4427, "y": -0.6519, "z": 0.4592, "w": 0.4099};
//Quat.orientation

Entities.addEntity({
    position: Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation)),
    "script": Script.resolvePath("Marker.js") ,
    type: "Model",
    modelURL: "https://vhilab.github.io/cdr-hf-hosting/models/bluemarker_export.fbx",
    dimensions: {"x" : 0.0153, "y" : 0.0153, "z" : 0.1650},
    name: "Marker",
    collisionless: true,
    "userData": JSON.stringify({
    	"grabbableKey" : { "wantsTrigger" : true },
    	"wearable" : {
    		"joints" : {
    			"RightHand" : [ {
    				"x": 0.04,
    				"y": 0.12,
    				"z": 0.04
    			}, {
    				"x": -0.707,
    				"y": 0,
    				"z": 0,
    				"w": 0.707
    			} ],
    			/* {
    				"x" : -0.1865966,
    				"y" : -0.3122868,
    				"z" : 0.2245211,
    				"w" : 0.9040182
    			} ],*/
    			"LeftHand" : [ {
    				"x": -0.04,
    				"y": 0.12,
    				"z": 0.04
    			}, {
    				"x": -0.707,
    				"y": 0,
    				"z": 0.0,
    				"w": 0.707
    			} ]
    		}
    	}
    })
});
