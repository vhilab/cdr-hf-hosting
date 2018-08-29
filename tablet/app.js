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
    var current_home = APP_URL;
    
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
		print("gemstoneApp.js received a web event: " + event);
		// Converts the event to a JavaScript Object
	    if (typeof event === "string") {
	        event = JSON.parse(event);
	    }

	    if (event.type === "click") {
	    	// do different things depending on the buttons.
	    	if (event.data == "Marker") {

	    	} else if (event.data == "Eraser") {

	    	} else if (event.data == "Lock Tracking") {
	    		
	    	} else if (event.data == "Concept Generation Task") {
	    		current_home = PAGE_CONCEPT_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "DM1") {
	    		current_home = PAGE_DM1_URL;
	    		tablet.gotoWebScreen(current_home);
	    	} else if (event.data == "DM2") {
	    		
	    	} else if (event.data == "DM3") {
	    		
	    	}
	    }
	}
	tablet.webEventReceived.connect(onWebEventReceived);
}());
