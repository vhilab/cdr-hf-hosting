var mappingJSON = {
    "name": "com.highfidelity.controllers.example.jsonMapping",
    "channels": [
        // include this to test whether it's loaded.
        { "from": "Standard.LT", "to": "Actions.TranslateY" },
        { "from": "Vive.RT", "to": "Actions.TranslateY" },
        
        // disable left and right big buttons, to stop rotate and teleport.
        { "from": "Standard.LS", "to": "Actions.Roll" }, // note that roll doesn't do anything, thankfully.
        //{ "from": "Standard.RS", "to": "Actions.Roll"},
        { "from": "Vive.RS", "to": "Actions.Roll"},
        { "from": "Vive.RS_CENTER", "to": "Actions.Roll"},
        { "from": "Vive.RS_X", "to": "Actions.Roll"},
        { "from": "Vive.RS_Y", "to": "Actions.Roll"},
    ]
};

var newMapping = Controller.parseMapping(JSON.stringify(mappingJSON));
newMapping.enable();
Messages.sendLocalMessage('Hifi-Teleport-Disabler','both');

Script.scriptEnding.connect(function () {
    newMapping.disable();
    Messages.sendLocalMessage('Hifi-Teleport-Disabler','none');
});
