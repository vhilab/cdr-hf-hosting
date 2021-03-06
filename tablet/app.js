(function() {
    // Every great app starts with a great name (keep it short so that it can fit in the tablet button)
    var APP_NAME = "CDR STUDY";
    
    // Link to your app's HTML file
    var APP_URL = "https://vhilab.github.io/cdr-hf-hosting/tablet/index.html";
    var APP_ICON = "https://vhilab.github.io/cdr-hf-hosting/tablet/noun-concept_1318350.svg";
    var PAGE_CONCEPT_URL = "https://vhilab.github.io/cdr-hf-hosting/tablet/concept.html";
    var PAGE_DM1_URL = "https://vhilab.github.io/cdr-hf-hosting/tablet/dm1.html";
    var PAGE_DM2_URL = "https://vhilab.github.io/cdr-hf-hosting/tablet/dm2.html";
    var PAGE_DM3_URL = "https://vhilab.github.io/cdr-hf-hosting/tablet/dm3.html";
    var PAGE_TELEPORTING = "https://vhilab.github.io/cdr-hf-hosting/tablet/teleporting.html";
    var current_home = APP_URL;

    var is_tracking_locked = false;
	var is_position_collecting = false;
	var username = "";
    var position_timer = null;
    
    // Get a reference to the tablet
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    
    // "Install" your cool new app to the tablet
    // The following lines create a button on the tablet's menu screen
    var button = tablet.addButton({
    	//icon: APP_ICON,
        text: APP_NAME
    });
    
    // Provide a way to "uninstall" the app
    // Here, we write a function called "cleanup" which gets executed when
    // this script stops running. It'll remove the app button from the tablet.
    function cleanup() {
    	deleteAllMarkersAndErasers ();
        tablet.removeButton(button);
    }
    Script.scriptEnding.connect(cleanup);
    
    // Link to your app's HTML file
    // When a user clicks the app button, we'll display our app on the tablet screen
    function onClicked() {
	    
        tablet.gotoWebScreen(current_home);
    }
    button.clicked.connect(onClicked);

    var allMarkersAndErasers = [];

    function getAvatarFront() {
    	return Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation));
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randPos(side) {
        return { x: random(-side, side), y: random(-side, side), z: random(-side, side)};
    }
    
    function randPos(x, y, z) {
        return { x: random(-x, x), y: random(-y, y), z: random(-z, z)};
    }

    function randWithinReach() {
        return Vec3.sum(randPos(0.3, 0, 0.3), { x: 0, y: 1, z: 0});
    }

    function createEraser(position) {
    	var newEraserUUID = Entities.addEntity({
		    position: position,
		    "script": Script.resolvePath("Eraser.js") ,
		    type: "Box",
		    color: { red: 255, green: 255, blue: 255 },
		    dimensions: { x: .1, y: .05, z: .02 },
		    name: "Eraser",
		    collisionless: true,
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

		allMarkersAndErasers.push(newEraserUUID);
    }

    function createMarker(position) {
    	var newMarkerUUID = Entities.addEntity({
		    position: position,
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

		allMarkersAndErasers.push(newMarkerUUID);
    }

    function deleteAllMarkersAndErasers (){
	    while(allMarkersAndErasers.length > 0) {
	        Entities.deleteEntity(allMarkersAndErasers.pop());
	    }
	}
	

	var username = "to_calc";
	function username_reply(nodeID, userName, machineFingerprint, isAdmin) {
		print("nodeID " + nodeID)
		print("userName " + userName)
		print("machineFingerprint " + machineFingerprint)
		print("isAdmin " + isAdmin)
		username = userName;
	}
	Users.usernameFromIDReply.connect(username_reply);

	var sessionUUID = Uuid.generate(); //MyAvatar.sessionUUID;
	//Users.requestUsernameFromID(sessionUUID);

    // Handle the events we're receiving from the web UI
	function onWebEventReceived(event) {
		print("app.js received a web event: " + event);
		// Converts the event to a JavaScript Object
	    if (typeof event === "string") {
	        event = JSON.parse(event);
	    }

	    print("type is" + event.type);
	    if (event.type === "cdr-click") {
	    	// do different things depending on the buttons.
	    	print("data is" + event.data);
			if (typeof(event.data) === typeof({})) {
				// it's a button press from the teleport thingy.
				var targetPositionDict = {
					1 : { // core
						1 : { // table
							"A" : { x:61.47, y:-11.49, z:-81.34 },
							"B" : { x:61.47, y:-11.49, z:-81.34 },
							"C" : { x:61.47, y:-11.49, z:-81.34 },
						},
						2 : { // no table
							"A" : { x:66.16, y:-11.49, z:-57.0},
							"B" : { x:66.16, y:-11.49, z:-57.0},
							"C" : { x:66.16, y:-11.49, z:-57.0},
						}
					}, 
					2 : { // periphery
						1 : { // table
							"A" : { x:-46.14, y:-11.49, z:-75.20 },
							"B" : { x:-46.14, y:-11.49, z:-75.20 },
							"C" : { x:-46.14, y:-11.49, z:-75.20 },
						},
						2 : { // no table
							"A" : { x:-16.99, y:-11.49, z:-79.66 },
							"B" : { x:-16.99, y:-11.49, z:-79.66 },
							"C" : { x:-16.99, y:-11.49, z:-79.66 },
						}
					}
				};
				
				var targetPosition = targetPositionDict[event.data["row"]][event.data["col"]][event.data["value"]];
				//print("target position is " + JSON.stringify(targetPosition));
				//var orientation = { x: 0, y: 0, z: 0, w: 1 };

				deleteAllMarkersAndErasers();
				
				// create markers and erasers within reach
				// each person separately maintains their marker and eraser list, so only make one.
				createMarker(Vec3.sum(targetPosition, randWithinReach()));
				createEraser(Vec3.sum(targetPosition, randWithinReach()));
				

				MyAvatar.goToFeetLocation(targetPosition, true, Quat.IDENTITY, false);
			} else if (event.data == "Marker") {
	    		createMarker(getAvatarFront());
	    	} else if (event.data == "Eraser") {
	    		createEraser(getAvatarFront());
	    	} else if (event.data == "Lock Tracking") {
	    		if (is_tracking_locked) {
	    			Messages.sendLocalMessage('Hifi-Teleport-Disabler','none'); // enable teleporting
	    			Controller.releaseActionEvents(); // enable rotation
	    			is_tracking_locked = false;
	    		} else {
	    			Controller.captureActionEvents(); // disable rotation
	    			Messages.sendLocalMessage('Hifi-Teleport-Disabler','both'); // disable teleporting
	    			is_tracking_locked = true;
	    		}
	    	} else if (event.data == "Erase Writings") {
			var nearbyItems = Entities.findEntities(MyAvatar.position, 100);
			nearbyItems.forEach(function(elem) {
	        		var elemProperties = Entities.getEntityProperties(elem, ["userData"]);
				try {
					properties = JSON.parse(elemProperties.userData);
					if (properties.eraseable) {
						Entities.deleteEntity(elem)
					}
				} catch (error) {
				}
	        	});
	    	} else if (event.data == "Concept Generation Task") {
	    		current_home = PAGE_CONCEPT_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "DM1") {
	    		current_home = PAGE_DM1_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "DM2") {
	    		current_home = PAGE_DM2_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "DM3") {
	    		current_home = PAGE_DM3_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "returnToMenu") {
	    		current_home = APP_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "Teleport to Room") {
				tablet.gotoWebScreen(PAGE_TELEPORTING);
		} else if (event.data == "Collect Position Data") {
			is_position_collecting = !is_position_collecting
			if (is_position_collecting) {
				var leftHandIndex = MyAvatar.getJointIndex("LeftHand");
				var rightHandIndex = MyAvatar.getJointIndex("RightHand");
				
				function sendPositionData() {
					var xhr = new XMLHttpRequest();
					xhr.open("POST", "https://cdr-hf-tracking.herokuapp.com/dump/", true);

					// here, add the callback to beep the light a little.
					//xhr.onreadystatechange = function() { // Call a function when the state changes.
					//	console.log("xhr state change");
					//	if (this.readyState === XMLHttpRequest.DONE) {
					//		console.log("request DONE");
					//			console.log(this.status); // it appears this.status is undefined?
					//		if (this.status === 201) {
					//			console.log("received 201");
					//		}
					//	}
					//}

					var data = {
						"session_id" : sessionUUID,
						"data" : [{
							"head" : {
								"pos" : HMD.position,
								"rot" : HMD.orientation,
							},
							"left" : {
								"pos" : MyAvatar.getAbsoluteJointTranslationInObjectFrame(leftHandIndex),
								"rot" : MyAvatar.getAbsoluteJointRotationInObjectFrame(leftHandIndex)
							},
							"right" : {
								"pos" : MyAvatar.getAbsoluteJointTranslationInObjectFrame(rightHandIndex),
								"rot" : MyAvatar.getAbsoluteJointRotationInObjectFrame(rightHandIndex)
							},
							"avatar" : {
								"pos" : MyAvatar.position,
								"rot" : MyAvatar.orientation,
							},
							"mounted" : HMD.mounted,
							"note" : "",
							"sent" : Date.now(),
							"username" : username
						}]
					};

					//print("Username == " + username);


					xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					xhr.send(JSON.stringify(data));
					// this doesn't do it right? it appears??
					//tablet.emitScriptEvent(JSON.stringify({"type": "cdr-script", "data" : "pos data ack"}));
				}

				position_timer = Script.setInterval(sendPositionData, 50);
			} else {
				Script.clearInterval(position_timer);
			}
			
		}
	    }
	}
	tablet.webEventReceived.connect(onWebEventReceived);
}());
