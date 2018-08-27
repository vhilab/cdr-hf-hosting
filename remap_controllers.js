var mappingJSON = {
    "name": "com.highfidelity.controllers.example.jsonMapping",
    "channels": [
        // include this to test whether it's loaded.
        { "from": "Standard.LT", "to": "Actions.TranslateY" },
        { "from": "Standard.RT", "to": "Actions.TranslateY" },
        
        // disable left and right big buttons, to stop rotate and teleport.
        { "from": "Standard.LS", "to": "Actions.Roll" }, // note that roll doesn't do anything, thankfully.
        //{ "from": "Standard.RS", "to": "Actions.Roll"},
        { "from": "Vive.RS", "to": "Actions.Roll"}
    ]
};

var oldMapping = Controller.

var newMapping = Controller.parseMapping(JSON.stringify(mappingJSON));
newMapping.enable();

Script.scriptEnding.connect(function () {
    newMapping.disable();
});
