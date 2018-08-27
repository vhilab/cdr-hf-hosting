var mappingJSON = {
    "name": "com.highfidelity.controllers.example.jsonMapping",
    "channels": [
        // include this to test whether it's loaded.
        { "from": "Hardware.Vive.LT", "to": "Actions.TranslateY" },
        { "from": "Standard.RT", "to": "Actions.TranslateY" },
        
        // disable left and right big buttons, to stop rotate and teleport.
        { "from": "Hardware.Vive.LS", "to": "Actions.Roll" }, // note that roll doesn't do anything, thankfully.
        { "from": "Hardware.Vive.RS", "to": "Actions.Roll"}
    ]
};

var mapping = Controller.parseMapping(JSON.stringify(mappingJSON));
mapping.enable();

Script.scriptEnding.connect(function () {
    mapping.disable();
});
