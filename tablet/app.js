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
        tablet.removeButton(button);
    }
    Script.scriptEnding.connect(cleanup);
    
    // Link to your app's HTML file
    // When a user clicks the app button, we'll display our app on the tablet screen
    function onClicked() {
        tablet.gotoWebScreen(current_home);
    }
    button.clicked.connect(onClicked);

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
							"A" : { x:-44.50, y:-11.49, z:-39.51 },
							"B" : { x:-44.50, y:-11.49, z:-39.51 },
							"C" : { x:-44.50, y:-11.49, z:-39.51 },
						},
						2 : { // no table
							"A" : { x:0.29, y:-11.49, z:-33.98 },
							"B" : { x:0.29, y:-11.49, z:-33.98 },
							"C" : { x:0.29, y:-11.49, z:-33.98 },
						}
					}
				};
				
				var targetPosition = targetPositionDict[event.data["row"]][event.data["col"]][event.data["value"]];
				var orientation = { x: 0, y: 0, z: 0, w: 1 };
				MyAvatar.goToFeetLocation(targetPosition);
			} else if (event.data == "Marker") {
	    		Script.include("https://vhilab.github.io/cdr-hf-hosting/createMarker.js");
	    	} else if (event.data == "Eraser") {
	    		Script.include("https://vhilab.github.io/cdr-hf-hosting/createEraser.js");
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
			}
	    }
	}
	tablet.webEventReceived.connect(onWebEventReceived);
}());
